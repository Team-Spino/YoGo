import React from 'react';
import uuid from 'react-native-uuid';
import { TimeZoneCard } from 'components';
import { DUMMY_TIME_ZONE } from 'utils';
import * as S from './style';

export function TimeZoneList({ cardList }: { cardList: Array<string> }) {
  return (
    <S.Container>
      <S.ScrollView>
        {cardList.map((location: string) => (
          <TimeZoneCard key={uuid.v4()} location={location} />
        ))}
      </S.ScrollView>
    </S.Container>
  );
}
