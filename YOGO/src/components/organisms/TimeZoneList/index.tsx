import React from 'react';
import uuid from 'react-native-uuid';
import { TimeZoneCard } from 'components';
import * as S from './style';
import { Text } from 'react-native';


export function TimeZoneList() {
  
  return (
    <>
      <S.Container>
        <TimeZoneCard location={'Asia/Seoul'} />
        <TimeZoneCard location={'Pacific/Midway'} />
        <TimeZoneCard location={'Europe/Copenhagen'} />
        <TimeZoneCard location={'Asia/Ust-Nera'} />
      </S.Container>
    </>
  );
}
