import React from 'react';
import { ScheduleCard } from 'components';
import * as S from './style';

export function Home() {
  return (
    <S.Container>
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
    </S.Container>
  );
}
