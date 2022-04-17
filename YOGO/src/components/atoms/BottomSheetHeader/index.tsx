import React from 'react';
import * as S from './style';
interface BHearderProps {
  text: string;
  size: number;
}

export function BottomSheetHeader({ text, size }: BHearderProps) {
  return (
    <S.Header size={size}>
      {text}
    </S.Header>
  );
}
