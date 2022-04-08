import React from 'react';
import * as S from './style';

export function Title({
  isEnable,
  text,
  size,
}: {
  isEnable: boolean;
  text: string;
  size: number;
}) {
  return <S.Text isEnable={isEnable} size={size}>{text}</S.Text>;
}
