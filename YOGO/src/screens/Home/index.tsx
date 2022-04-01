import React from 'react';
import * as S from './style';
import { TimeZoneCard } from '/components';

export function Home() {
  return (
    <S.Container>
      <S.Title>Home</S.Title>
      <TimeZoneCard objectNation = {'londan'}/>
    </S.Container>
  );
}
