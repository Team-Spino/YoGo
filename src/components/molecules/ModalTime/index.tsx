import React from 'react';
import { ModalTimeInfo } from 'components';
import { ICurProps, ITargetProps } from 'types';
import * as S from './style';

interface IModalTimeProps {
  timeData: {
    target: ITargetProps;
    cur: ICurProps;
  };
  leftTime: string;
  selectedDay: string;
}

export function ModalTime({
  timeData,
  leftTime,
  selectedDay,
}: IModalTimeProps) {
  return (
    <S.Container>
      <ModalTimeInfo timeData={timeData} selectedDay={selectedDay} />
      <S.Text>{leftTime}</S.Text>
    </S.Container>
  );
}
