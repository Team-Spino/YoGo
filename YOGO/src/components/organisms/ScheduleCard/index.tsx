import React from 'react';
import { View, Text, Switch } from 'react-native';
import { ScheduleCardLeftInfo, ScheduleCardRightInfo } from 'components';
import * as S from './style';

export function ScheduleCard() {
  return (
    <S.Container>
      <S.Wrapper>
        <ScheduleCardLeftInfo />
        <ScheduleCardRightInfo />
      </S.Wrapper>
    </S.Container>
  );
}
