import React from 'react';
import { TimeOfTZ, Title } from 'components';
import * as S from './style';

interface IResultCardProps {
  title: string;
  time: string;
  meridiem: string;
}

export const ResultCard = ({ title, time, meridiem }: IResultCardProps) => {
  return (
    <S.Container>
      <Title isEnable={true} text={title} size={12} />
      <TimeOfTZ time={time} meridiem={meridiem} isResult={true} />
    </S.Container>
  );
};
