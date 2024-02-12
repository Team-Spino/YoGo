import React from 'react';
import { SettingSchedule } from 'components';
import { IHandelScheduleProps} from 'types';
import * as S from './style';

export function HandleScheduleTemplate({ navigation, route }: IHandelScheduleProps) {
  console.log('route', route);
  return (
    <S.Container>
      <SettingSchedule navigation={navigation} route={route} />
    </S.Container>
  );
}
