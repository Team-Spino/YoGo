import React from 'react';
import { Title, ToggleBtn } from 'components';
import * as S from './style';

export function ScheduleCardRightInfo() {
  return (
    <S.Container>
      <Title text={'9 : 00 pm'} size={20} />
      <ToggleBtn />
    </S.Container>
  );
}
