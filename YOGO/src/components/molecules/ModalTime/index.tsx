import React from 'react';
import { Text } from 'react-native';
import { ModalTimeInfo } from 'components';
import * as S from './style';

export function ModalTime() {
  return (
    <S.Container>
      <ModalTimeInfo />
    </S.Container>
  );
}
