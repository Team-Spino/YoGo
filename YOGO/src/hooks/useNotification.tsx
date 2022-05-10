import PushNotificationIOS from '@react-native-community/push-notification-ios';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';

interface INotificationProps {
  key: string;
  title: string;
  city: string;
  description: string;
  date: string;
  dayOfWeek: Array<string>;
}

interface IMakeAlartDateProps {
  date: string;
  dayOfWeek: Array<string>;
}

interface IAlartOptionProps {
  key: string;
  title: string;
  city: string;
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
    city,
    description,
    date,
    isRepeat,
  }: IAlartOptionProps) => {
    const defaultOptions = {
      id: key,
      title: title,
      subtitle: city,
      body: description,
      badge: 1,
      fireDate: new Date(date),
      repeats: false,
      sound: 'default',
      category: 'myCategory',
      userInfo: {
        key: 'value',
      },
      isCritical: true,
    };

    const repeatOptions = {
      repeats: true,
      repeatsComponent: {
        dayOfWeek: true,
      },
    };

    return isRepeat ? { ...defaultOptions, ...repeatOptions } : defaultOptions;
  };

  const makeNotification = ({
    key,
    title,
    city,
    description,
    date,
    dayOfWeek,
  }: INotificationProps) => {
    PushNotificationIOS.requestPermissions();

    if (dayOfWeek.length === 0) {
      PushNotificationIOS.addNotificationRequest(
        setOptions({ key, title, city, description, date, isRepeat: false }),
      );

      return;
    }

    makeAlartDate({ date, dayOfWeek }).forEach(alartDate => {
      PushNotificationIOS.addNotificationRequest(
        setOptions({
          key,
          title,
          city,
          description,
          date: alartDate,
          isRepeat: true,
        }),
      );
    });
  };

  return { makeNotification };
}
