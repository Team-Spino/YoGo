import React from 'react';
import * as S from './style';
interface ITitleProps {
  isEnable: boolean;
  text: string;
  size: number;
}

export function Title({ isEnable, text, size }: ITitleProps) {
  return (
    <S.Text isEnable={isEnable} size={size}>
      {text}
    </S.Text>
  );
}
