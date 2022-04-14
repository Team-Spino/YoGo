import React from 'react';
import { ModalTimeInfo, ModalLeftTime } from 'components';
import * as S from './style';

export function ModalTime() {
  return (
    <S.Container>
      <ModalTimeInfo />
      <ModalLeftTime />
    </S.Container>
  );
}
