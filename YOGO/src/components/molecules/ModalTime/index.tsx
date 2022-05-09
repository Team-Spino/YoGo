import React from 'react';
import { ModalTimeInfo } from 'components';
import { ICur, ITarget } from 'types';
import * as S from './style';

interface IModalTimeProps {
  timeData: {
    target: ITarget;
    cur: ICur;
  };
  leftTime: string;
}

export function ModalTime({ timeData, leftTime }: IModalTimeProps) {
  return (
    <S.Container>
      <ModalTimeInfo timeData={timeData} />
      <S.Text>{leftTime}</S.Text>
    </S.Container>
  );
}
