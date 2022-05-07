import React from 'react';
import { LocationOfTZ, TimeOfTZ } from 'components';
import * as S from './style';

export const TimeZoneCard = () => {
  return (
    <S.Container>
      <LocationOfTZ headerSize={8} contentSize={20} />
      <TimeOfTZ timesize={32} postandAfterSize={16} />
    </S.Container>
  );
};
