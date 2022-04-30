import React from 'react';
import * as S from './style';
interface IBHearderProps {
  text: string;
  size: number;
  isWhite?: boolean; 
}

export function BottomSheetHeader({ text, size, isWhite=false }: IBHearderProps) {
  return <S.Header size={size} isWhite = {isWhite}>{text}</S.Header>;
}
