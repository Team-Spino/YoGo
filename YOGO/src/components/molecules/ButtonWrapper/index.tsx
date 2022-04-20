import React from 'react';
import { Button } from 'components';
import * as S from './style';

export function ButtonWrapper() {
  return (
    <S.Container>
      <Button text="Cancel" color="#e5565e" />
      <Button text="Submit" color="#0F81FE" />
    </S.Container>
  );
}
