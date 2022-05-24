import dayjs from 'dayjs';
import React from 'react';
import * as S from './style';

interface ITimeOfTZProps {
  time: string;
  meridiem: string;
  isResult: boolean;
}

export const TimeOfTZ = ({ time, meridiem, isResult }: ITimeOfTZProps) => {
  const size = isResult
    ? {
        time: 50,
        meridiem: 50,
      }
    : {
        time: 32,
        meridiem: 16,
      };
  return (
    <S.Container>
      <S.Time size={size.time}>{time}</S.Time>
      <S.Meridiem size={size.meridiem}>{meridiem}</S.Meridiem>
    </S.Container>
  );
};
