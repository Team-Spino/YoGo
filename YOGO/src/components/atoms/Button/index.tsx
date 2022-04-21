import React from 'react';
import * as S from './style';

interface IButtonProps {
  text: string;
  onPress: () => void;
}

export function Button({ text, onPress }: IButtonProps) {
  return (
    <S.Container onPress={onPress}>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}
