import React from 'react';
import { TimeZoneCard } from 'components';
import * as S from './style';

export function TimeZoneList() {
  return (
    <>
      <S.Container>
        <TimeZoneCard />
        <TimeZoneCard />
        <TimeZoneCard />
        <TimeZoneCard />
      </S.Container>
    </>
  );
}
