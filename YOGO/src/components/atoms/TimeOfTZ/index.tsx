import React from 'react';
import * as S from './style';

interface ITimeOfTZProps {
  timesize : number;
  postandAfterSize : number;
}

export const TimeOfTZ = ({timesize, postandAfterSize }: ITimeOfTZProps) => {
  return (
      <S.rightDiv>
        <S.rightDivTime size = {timesize} >08 : 00</S.rightDivTime>
        <S.rightDivTimeTail size ={postandAfterSize} >pm</S.rightDivTimeTail>
      </S.rightDiv>
  );
};
