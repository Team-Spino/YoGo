import React from 'react';
import * as S from './style';

export function Title({ text, size }: { text: string; size: number }) {
  return <S.Text size={size}>{text}</S.Text>;
}
