import React from 'react';
import * as S from './style';

interface ILocationOfTZProps {
  timeDifference: string;
  city: string;
}

export const LocationOfTZ = ({ timeDifference, city }: ILocationOfTZProps) => {
  return (
    <S.leftDiv>
      <S.leftDivHeader size={8}>{timeDifference}</S.leftDivHeader>
      <S.leftDivContent size={20}>{city}</S.leftDivContent>
    </S.leftDiv>
  );
};
