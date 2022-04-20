import React from 'react';
import { SettingSchedule, ButtonWrapper } from 'components';
import * as S from './style';

export function HandleScheduleTemplate() {
  return (
    <S.Container>
      <SettingSchedule />
      <ButtonWrapper />
    </S.Container>
  );
}
