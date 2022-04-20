import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { SettingSchedule, ButtonWrapper } from 'components';
import { RootStackParamList } from 'types';
import * as S from './style';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function HandleScheduleTemplate({ navigation }: { navigation: Prop }) {
  const onGoBack = () => navigation.goBack();
  const onSubmit = () => navigation.goBack();
  return (
    <S.Container>
      <SettingSchedule />
      <ButtonWrapper onGoBack={onGoBack} onSubmit={onSubmit} />
    </S.Container>
  );
}
