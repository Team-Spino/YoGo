import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';

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
      id: key,
      title,
      message: description,
      soundName: 'default',
      playSound: true,
      date: new Date(date),
      allowWhileIdle: true,
    };

    const repeatOptions = {
      repeatType: 'week',
    };

    return isRepeat ? { ...defaultOptions, ...repeatOptions } : defaultOptions;
  };

  const makeNotification = ({
    key,
    title,
    description,
    date,
    dayOfWeek,
  }: INotificationProps) => {
    PushNotificationIOS.requestPermissions();

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

    console.log(
      PushNotification.getScheduledLocalNotifications(notifications =>
        console.log(notifications),
      ),
    );
  };

  return { makeNotification };
}
