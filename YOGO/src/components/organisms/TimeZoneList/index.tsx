import React from 'react';
import * as S from './style';
import { TimeZoneCard } from 'components';

export function TimeZoneList() {
  return (
    <S.Container>
      <TimeZoneCard />
      <TimeZoneCard />
      <TimeZoneCard />
      <TimeZoneCard />
    </S.Container>
  );
}
