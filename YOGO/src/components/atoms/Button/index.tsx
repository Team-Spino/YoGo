import React from 'react';
import * as S from './style';

interface IButtonProps {
  text: string;
  color: string;
}

export function Button({ text, color }: IButtonProps) {
  return (
    <S.Button>
      <S.Text color={color}>{text}</S.Text>
    </S.Button>
  );
}
