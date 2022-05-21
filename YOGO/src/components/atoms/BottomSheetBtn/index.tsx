import React from 'react';
import * as S from './style';

interface IBottomSheetBtnProps {
  text: string;
  onPress: () => void | ((index: number) => void);
  isRevers?: boolean;
}

export function BottomSheetBtn({
  text,
  onPress,
  isRevers = false,
}: IBottomSheetBtnProps) {
  return (
    <S.Container isRevers={isRevers} onPress={onPress}>
      <S.Text isRevers={isRevers}>{text}</S.Text>
    </S.Container>
  );
}
