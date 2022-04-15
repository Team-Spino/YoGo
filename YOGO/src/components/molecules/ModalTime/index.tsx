import React from 'react';
import { ModalTimeInfo } from 'components';
import { ICur, ITarget } from 'types';
import * as S from './style';

interface IModalTimeProps {
  timeData: {
    target: ITarget;
    cur: ICur;
  };
}

export function ModalTime({ timeData }: IModalTimeProps) {
  return (
    <S.Container>
      <ModalTimeInfo timeData={timeData} />
      <S.Text>{'알람까지 14분 남았습니다'}</S.Text>
    </S.Container>
  );
}
