import React from 'react';
import * as S from './style';

interface IBottomSheetBtnProps {
  text: string;
  onPress: () => void;
}

export function BottomSheetBtn({ text, onPress }: IBottomSheetBtnProps) {
  return (
    <S.Container onPress={onPress}>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}
