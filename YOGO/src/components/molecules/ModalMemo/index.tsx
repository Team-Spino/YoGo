import React from 'react';
import * as S from './style';

export function ModalMemo({ description }: { description: string }) {
  return (
    <S.Container>
      <S.Text>{description}</S.Text>
    </S.Container>
  );
}
