import React from 'react';
import * as S from './style';

export function Tag({ color }: { color: string }) {
  return <S.Container color={color} />;
}
