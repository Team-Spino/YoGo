import React from 'react';
import { TimeZoneCard, FloatingButton } from 'components';
import { IconSearch } from 'assets';
import * as S from './style';

export function TimeZoneList() {
  const onPress = () => console.log('hello');
  return (
    <>
      <S.Container>
        <TimeZoneCard />
        <TimeZoneCard />
        <TimeZoneCard />
        <TimeZoneCard />
      </S.Container>
      <FloatingButton onPress={onPress}>
        <IconSearch />
      </FloatingButton>
    </>
  );
}
