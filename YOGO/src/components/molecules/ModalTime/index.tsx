import React from 'react';
import { ModalTimeInfo, ModalLeftTime } from 'components';
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
      <ModalLeftTime />
    </S.Container>
  );
}
