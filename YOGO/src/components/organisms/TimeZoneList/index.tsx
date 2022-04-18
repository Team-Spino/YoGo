import React from 'react';
import { TimeZoneCard, FloatingButton } from 'components';
import { IconSearch } from 'assets';
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
      <FloatingButton>
        <IconSearch />
      </FloatingButton>
    </>
  );
}
