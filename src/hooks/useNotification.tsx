import { useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
import {
  connectDB,
  createAlarmPermissionTable,
  inesertAlarmPermission,
  getAlarmPermission,
  updateAlarmPermission,
  deleteAlarmPermission,
} from 'db';
import { parseToSlash } from 'utils';
import { IScheduleProps } from 'types';

interface INotificationProps {
  key: number;
  title: string;
  description: string;
  date: string;
  dayOfWeek: Array<string>;
}

interface IMakeAlartDateProps {
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

export function useNotification() {
  const getNextDay = ({ date }: { date: string }) => {
    const nextDay = new Date(parseToSlash(date));
    nextDay.setDate(nextDay.getDate() + 1);
    return dayjs(new Date(parseToSlash(nextDay))).format('YYYY-MM-DD HH:mm');
  };

  const makeAlartDate = ({ date, dayOfWeek }: IMakeAlartDateProps) => {
    let nextDate = date;
    const alartList = [date];
    const LENGTH_OF_DAY_OF_WEEK = 6;

    for (let i = 0; i < LENGTH_OF_DAY_OF_WEEK; i++) {
      nextDate = getNextDay({ date: nextDate });

      const weekDay = new Date(parseToSlash(nextDate)).toLocaleDateString(
        'en-US',
        {
          weekday: 'short',
        },
      );

      if (dayOfWeek.includes(weekDay)) {
        alartList.push(nextDate.trim());
      }
    }

    return alartList;
  };

  const setOptions = ({
    key,
    title,
    description,
    date,
    isRepeat,
  }: IAlartOptionProps) => {
    const defaultOptions = {
      id: uuid.v4() as string,
      title,
      message: description,
      soundName: 'default',
      playSound: true,
      date: new Date(parseToSlash(date)),
      allowWhileIdle: true,
      number: 1,
      userInfo: { key: key },
    };

    const repeatOptions = {
      repeatType: 'week',
    };
    return isRepeat ? { ...defaultOptions, ...repeatOptions } : defaultOptions;
  };

  const makeNotification = async ({
    key,
    title,
    description,
    date,
    dayOfWeek,
  }: INotificationProps) => {
    if (dayOfWeek.length === 0) {
      PushNotification.localNotificationSchedule(
        setOptions({
          key,
          title,
          description,
          date,
          isRepeat: false,
        }),
      );

      return;
    }

    makeAlartDate({ date, dayOfWeek }).forEach(alartDate => {
      PushNotification.localNotificationSchedule(
        setOptions({
          key,
          title,
          description,
          date: alartDate,
          isRepeat: true,
        }),
      );
    });
  };

  const getTagetNumberNotifications = async ({
    number,
  }: {
    number: number;
  }) => {
    return new Promise(resolve => {
      PushNotification.getScheduledLocalNotifications(notifications => {
        resolve(
          notifications
            .filter(notification => {
              return notification.data.key === number;
            })
            .map(notification => notification.id),
        );
      });
    });
  };

  const deleteAllNotification = async ({ number }: { number: number }) => {
    const notifications = (await getTagetNumberNotifications({
      number,
    })) as Array<string>;
    PushNotificationIOS.removePendingNotificationRequests(notifications);
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
      deleteAllNotification({ number });
      return;
    }

    const { TITLE, DESCRIPTION, CUR_DAY, CUR_TIME, DAY_OF_WEEK } = schedule;

    makeNotification({
      key: number,
      title: TITLE,
      description: DESCRIPTION,
      date: `${CUR_DAY} ${CUR_TIME}`,
      dayOfWeek: JSON.parse(DAY_OF_WEEK),
    });
  };

  const handleNotificationPermission = async () => {
    await PushNotificationIOS.requestPermissions();

    // 사용자 허가 체크
    PushNotificationIOS.checkPermissions(async info => {
      const db = await connectDB();

      await createAlarmPermissionTable(db);

      const permission = await getAlarmPermission(db);

      // 알람이 허가되었고, db에 반영되지 않았을 때
      if (info.notificationCenter && !permission) {
        await inesertAlarmPermission(db, 1);
        return;
      }

      // 알람이 허가 되었고, db에 isAgree가 0일때 -> db에 업데이트
      if (info.notificationCenter && !permission.IS_AGREE) {
        await updateAlarmPermission(db, 1);
      }

      // 알람이 허가되었고, db에 active 되었을 때
      if (info.notificationCenter && permission.IS_AGREE) return;

      // 알람이 허가되지 않았고, db에 반영되지 않았을 때
      if (!info.notificationCenter && !permission) {
        Alert.alert(
          'YOGO',
          'Please allow permission to use the schedule notification service',
          [
            {
              text: 'Cancel',
              onPress: async () => {
                await inesertAlarmPermission(db, 0);
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

        return;
      }
    });
  };

  const getBadgeNumber = (): Promise<number> => {
    return new Promise(resolve => {
      PushNotification.getApplicationIconBadgeNumber(badge => {
        resolve(badge);
      });
    });
  };

  const handleNotificationBadge = useCallback(() => {
    PushNotificationIOS.setApplicationIconBadgeNumber(0);

    PushNotificationIOS.addEventListener('notification', async () => {
      const number = await getBadgeNumber();

      if (number === 0) return;

      PushNotificationIOS.setApplicationIconBadgeNumber(number - 1);
    });
    PushNotificationIOS.addEventListener('localNotification', async () => {
      const number = await getBadgeNumber();

      if (number === 0) return;

      PushNotificationIOS.setApplicationIconBadgeNumber(number - 1);
    });
  }, []);

  return {
    makeNotification,
    deleteAllNotification,
    handleScheduleToggle,
    handleNotificationPermission,
    handleNotificationBadge,
  };
}
