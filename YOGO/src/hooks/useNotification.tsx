import PushNotificationIOS from '@react-native-community/push-notification-ios';
import uuid from 'react-native-uuid';

interface INotificationProps {
  title: string;
  city: string;
  description: string;
  date: string;
}

export function useNotification() {
  const makeNotification = ({
    title,
    city,
    description,
    date,
  }: INotificationProps) => {
    PushNotificationIOS.requestPermissions();
    PushNotificationIOS.addNotificationRequest({
      id: uuid.v4() as string,
      title: title,
      subtitle: city,
      body: description,
      badge: 1,
      fireDate: new Date(date),
      repeats: true,
      repeatsComponent: {
        hour: false,
        minute: true,
      },
      sound: 'default',
      category: 'myCategory',
      userInfo: {
        key: 'value',
      },
      isCritical: true,
    });
  };

  return { makeNotification };
}
