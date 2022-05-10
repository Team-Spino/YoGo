import React from 'react';
import { IconSun } from 'assets';
import * as S from './style';

interface ILocationOfTZProps {
  timeDifference: string;
  city: string;
}

export const LocationOfTZ = ({ timeDifference, city }: ILocationOfTZProps) => {
  return (
    <S.leftDiv>
          <IconSun />
          <S.leftDivContainer>
          <S.leftDivHeader size={8}>{timeDifference}</S.leftDivHeader>
          <S.leftDivContent size={20}>{city}</S.leftDivContent>
          </S.leftDivContainer>
    </S.leftDiv>
  );
};