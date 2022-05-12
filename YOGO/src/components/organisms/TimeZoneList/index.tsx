import React from 'react';
import uuid from 'react-native-uuid';
import { TimeZoneCard } from 'components';
import { DUMMY_TIME_ZONE } from 'utils';
import * as S from './style';

export function TimeZoneList({cardList}: any) {
  const {key , location} = cardList;
  return (
    <>
      <S.Container>
          <TimeZoneCard key={key} location={location} />
      </S.Container>
    </>
  );
}
