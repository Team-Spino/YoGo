import React from 'react';
import * as S from './style';
interface ITitleProps {
  isEnable: boolean;
  text: string;
  size: number;
}

export function CardTitle({ isEnable, text, size }: ITitleProps) {
  return (
    <S.Text
      isEnable={isEnable}
      size={size}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {text}
    </S.Text>
  );
}
