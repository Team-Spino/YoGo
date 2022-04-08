import React from 'react';
import * as S from './style';

export function SubTitle({
  isEnable,
  text,
}: {
  isEnable: boolean;
  text: string;
}) {
  return <S.Text color={isEnable ? '#000000' : '#999999'}>{text}</S.Text>;
}
