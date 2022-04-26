import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { SettingSchedule, Button } from 'components';
import { RootStackParamList } from 'types';
import * as S from './style';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function HandleScheduleTemplate({ navigation }: { navigation: Prop }) {
  const onSubmit = () => {
    console.log('submit');
    navigation.goBack();
  };

  return (
    <S.Container>
      <SettingSchedule />
      <Button text="Submit" onPress={onSubmit} />
    </S.Container>
  );
}