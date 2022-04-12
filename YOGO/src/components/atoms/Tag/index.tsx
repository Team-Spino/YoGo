import React from 'react';
import * as S from './style';

export function Tag({ color, margin }: { color: string; margin: number }) {
  return <S.Container color={color} margin={margin} />;
}
