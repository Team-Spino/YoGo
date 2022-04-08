import React from 'react';
import * as S from './style';
interface ISubTitleProps {
  isEnable: boolean;
  text: string;
}

export function SubTitle({ isEnable, text }: ISubTitleProps) {
  return <S.Text color={isEnable ? '#000000' : '#999999'}>{text}</S.Text>;
}
