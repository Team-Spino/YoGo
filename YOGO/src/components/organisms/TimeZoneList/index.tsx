import React from 'react';
import uuid from 'react-native-uuid';
import { TimeZoneCard } from 'components';
import * as S from './style';
import { Text } from 'react-native';
import { ScrollView } from '../SearchSheet/style';


export function TimeZoneList({cardList}: any) {
  return (
    <>
      <S.Container>
        {cardList.map((location: string) => (
          <TimeZoneCard key={uuid.v4()} location={location} />  
        )
        )}
      </S.Container>
    </>
  );
}
