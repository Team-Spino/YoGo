import React from 'react';
import { TimeZoneCard } from 'components';
import { DUMMY_TIME_ZONE } from 'utils';
import * as S from './style';

export function TimeZoneList() {
  return (
    <S.Container>
      <S.Wrapper>
        {DUMMY_TIME_ZONE.map(location => (
          <TimeZoneCard location={location} />
        ))}
      </S.Wrapper>
    </S.Container>
  );
}
