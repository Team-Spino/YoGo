import React from 'react';
import { IconSun } from 'assets';
import * as S from './style';

interface ILocationOfTZProps {
  headerSize : number;
  contentSize : number;
}

export const LocationOfTZ = ({headerSize , contentSize}: ILocationOfTZProps) => {
  return (
        <S.leftDiv>
          <IconSun />
          <S.leftDivContainer>
          <S.leftDivHeader size={headerSize}>오늘, +10시간</S.leftDivHeader>
          <S.leftDivContent size ={contentSize}>Londan</S.leftDivContent>
          </S.leftDivContainer>
        </S.leftDiv>
  );
};
