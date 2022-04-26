import React from 'react';
import * as S from './style';
interface IHeaderCenterProps {
  text: string;
  size: number;
}

export function HeaderCenter({ text, size }: IHeaderCenterProps) {
  return (
    <S.Text size={size}>
      {text}
    </S.Text>
  );
}
