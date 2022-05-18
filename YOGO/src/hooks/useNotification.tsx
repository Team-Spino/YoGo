import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
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
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return dayjs(new Date(nextDay)).format('YYYY-MM-DD HH:mm');
  };

  const makeAlartDate = ({ date, dayOfWeek }: IMakeAlartDateProps) => {
    let nextDate = date;
    const alartList = [date];
    const LENGTH_OF_DAY_OF_WEEK = 6;

    for (let i = 0; i < LENGTH_OF_DAY_OF_WEEK; i++) {
      nextDate = getNextDay({ date: nextDate });

      const weekDay = new Date(nextDate).toLocaleDateString('en-US', {
        weekday: 'short',
      });

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
      date: new Date(date),
      allowWhileIdle: true,
      number: key,
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
              return notification.number === number;
            })
            .map(notification => notification.id),
        );
      });
    });
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
      const notifications = (await getTagetNumberNotifications({
        number,
      })) as Array<string>;
      PushNotificationIOS.removePendingNotificationRequests(notifications);

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

  return { makeNotification, handleScheduleToggle };
}
