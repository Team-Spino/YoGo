import React from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { SettingSchedule, Button } from 'components';
import { RootStackParamList } from 'types';
import * as S from './style';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function HandleScheduleTemplate({ navigation }: { navigation: Prop }) {
  const getCorrectDate = () => {
    const date = new Date();
    date.setDate(date.getDate());
    date.setHours(17);
    date.setMinutes(9);
    return date;
  };

  const onSubmit = () => {
    PushNotificationIOS.addNotificationRequest({
      id: '시발',
      title: '팀 스피노 프로젝트 2차 스크럼',
      subtitle: '배포 관련 회의',
      body: '양상우, 양지웅, 염상권, 김승덕 정혜연',
      badge: 1,
      fireDate: getCorrectDate(),
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

  return (
    <S.Container>
      <SettingSchedule />
      <Button text="Submit" onPress={onSubmit} />
    </S.Container>
  );
}
