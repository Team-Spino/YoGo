import React from 'react';
import * as S from './style';

interface IButtonProps {
  text: string;
  color: string;
  onPress: () => void;
}

export function Button({ text, color, onPress }: IButtonProps) {
  return (
    <S.Button onPress={onPress}>
      <S.Text color={color}>{text}</S.Text>
    </S.Button>
  );
}
