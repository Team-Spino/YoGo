import { useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import notifee, {
  AuthorizationStatus,
  EventType,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import dayjs from 'dayjs';
import {
  addAlarmPermission,
  editAlarmPermission,
  findAlarmPermission,
  initAlarmPermissionTable,
} from 'db';
import { getAlarmDates } from 'utils';
import { IScheduleProps } from 'types';

interface INotificationProps {
  key: number;
  title: string;
  description: string;
  date: string;
  dayOfWeek: Array<string>;
}

interface IAlartOptionProps {
  key: number;
  title: string;
  description: string;
  date: string;
  isRepeat: boolean;
}

/**
 * op-sqlite 커넥션처럼, 알림도 라이브러리를 갈아끼웠습니다.
 *
 * react-native-push-notification(관리 중단) → @notifee/react-native.
 * Notifee는 트리거 알림을 `id`로 식별하므로, 스케줄 한 건이 만드는 여러 개의
 * 요일별 알림에 같은 `data.scheduleKey`를 달아 두고, 삭제할 때 그 키로 모아
 * 지웁니다. Hermes는 `new Date('2024/01/15 09:00')`를 파싱하지 못하므로,
 * 타임스탬프는 반드시 dayjs로 만들어야 합니다.
 */
export function useNotification() {
  const buildTrigger = ({
    date,
    isRepeat,
  }: Pick<IAlartOptionProps, 'date' | 'isRepeat'>): TimestampTrigger => ({
    type: TriggerType.TIMESTAMP,
    timestamp: dayjs(date).valueOf(),
    ...(isRepeat ? { repeatFrequency: RepeatFrequency.WEEKLY } : {}),
  });

  const scheduleOne = async ({
    key,
    title,
    description,
    date,
    isRepeat,
  }: IAlartOptionProps) => {
    await notifee.createTriggerNotification(
      {
        title,
        body: description,
        data: { scheduleKey: String(key) },
        ios: { sound: 'default' },
      },
      buildTrigger({ date, isRepeat }),
    );
  };

  const makeNotification = async ({
    key,
    title,
    description,
    date,
    dayOfWeek,
  }: INotificationProps) => {
    if (dayOfWeek.length === 0) {
      await scheduleOne({ key, title, description, date, isRepeat: false });
      return;
    }

    await Promise.all(
      getAlarmDates({ date, weekdays: dayOfWeek }).map(alartDate =>
        scheduleOne({
          key,
          title,
          description,
          date: alartDate,
          isRepeat: true,
        }),
      ),
    );
  };

  const deleteAllNotification = async ({ number }: { number: number }) => {
    const triggers = await notifee.getTriggerNotifications();

    const ids = triggers
      .filter(
        ({ notification }) =>
          notification.data?.scheduleKey === String(number) && notification.id,
      )
      .map(({ notification }) => notification.id as string);

    await Promise.all(ids.map(id => notifee.cancelTriggerNotification(id)));
  };

  const handleScheduleToggle = async ({
    number,
    isActive,
    schedule,
  }: {
    number: number;
    isActive: boolean;
    schedule: IScheduleProps;
  }) => {
    if (!isActive) {
      await deleteAllNotification({ number });
      return;
    }

    const { TITLE, DESCRIPTION, CUR_DAY, CUR_TIME, DAY_OF_WEEK } = schedule;

    await makeNotification({
      key: number,
      title: TITLE,
      description: DESCRIPTION,
      date: `${CUR_DAY} ${CUR_TIME}`,
      dayOfWeek: JSON.parse(DAY_OF_WEEK),
    });
  };

  const handleNotificationPermission = async () => {
    const settings = await notifee.requestPermission();

    const isGranted =
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;

    await initAlarmPermissionTable();

    const permission = await findAlarmPermission();

    // 알람이 허가되었고, db에 반영되지 않았을 때
    if (isGranted && !permission) {
      await addAlarmPermission(1);
      return;
    }

    // 알람이 허가 되었고, db에 isAgree가 0일때 -> db에 업데이트
    if (isGranted && !permission.IS_AGREE) {
      await editAlarmPermission(1);
      return;
    }

    // 알람이 허가되었고, db에 active 되었을 때
    if (isGranted && permission.IS_AGREE) return;

    // 알람이 허가되지 않았고, db에 반영되지 않았을 때
    if (!isGranted && !permission) {
      Alert.alert(
        'YOGO',
        'Please allow permission to use the schedule notification service',
        [
          {
            text: 'Cancel',
            onPress: async () => {
              await addAlarmPermission(0);
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ],
      );
    }
  };

  const handleNotificationBadge = useCallback(() => {
    notifee.setBadgeCount(0);

    const lowerBadge = async () => {
      const number = await notifee.getBadgeCount();

      if (number === 0) return;

      await notifee.setBadgeCount(number - 1);
    };

    const unsubscribeForeground = notifee.onForegroundEvent(({ type }) => {
      if (type === EventType.DELIVERED) {
        lowerBadge();
      }
    });

    return unsubscribeForeground;
  }, []);

  return {
    makeNotification,
    deleteAllNotification,
    handleScheduleToggle,
    handleNotificationPermission,
    handleNotificationBadge,
  };
}
