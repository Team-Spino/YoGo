import React from 'react';
import * as S from './style';
interface IBHearderProps {
  text: string;
  size: number;
}

export function BottomSheetHeader({ text, size }: IBHearderProps) {
  return <S.Header size={size}>{text}</S.Header>;
}
