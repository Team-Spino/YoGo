import React from 'react';
import { TimeZoneCard } from 'components';
import { ICityProps } from 'types';
import * as S from './style';

export function TimeZoneList({ cardState }: { cardState: Array<ICityProps> }) {
  return (
    <S.Container>
      <S.ScrollView>
        {cardState.map(({ ID, CITY }: ICityProps) => (
          <TimeZoneCard key={ID} location={CITY} />
        ))}
      </S.ScrollView>
    </S.Container>
  );
}
