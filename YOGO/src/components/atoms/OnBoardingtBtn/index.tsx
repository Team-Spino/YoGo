import React from 'react';
import * as S from './style';

interface IOnBoardingtBtnProps {
  text: string;
  onPress: () => void;
  isSkip?: boolean
}

export function OnBoardingtBtn({ text, onPress, isSkip = false }: IOnBoardingtBtnProps) {
  return (
    <S.Container isSkip ={isSkip} onPress={onPress}>
      <S.Text isSkip ={isSkip}>{text}</S.Text>
    </S.Container>
  );
}
