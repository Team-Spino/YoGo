import React from 'react';
import * as S from './style';

interface ITimeOfTZProps {
  time: string;
  meridiem: string;
}

export const TimeOfTZ = ({ time, meridiem }: ITimeOfTZProps) => {
  return (
    <S.rightDiv>
      <S.rightDivTime size={32}>{time}</S.rightDivTime>
      <S.rightDivTimeTail size={16}>{meridiem}</S.rightDivTimeTail>
    </S.rightDiv>
  );
};
