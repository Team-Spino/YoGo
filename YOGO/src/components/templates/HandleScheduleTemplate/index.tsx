import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { SettingSchedule } from 'components';
import { RootStackParamList } from 'types';
import * as S from './style';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function HandleScheduleTemplate({ navigation }: { navigation: Prop }) {
  return (
    <S.Container>
      <SettingSchedule navigation={navigation} />
    </S.Container>
  );
}
