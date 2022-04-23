import React from 'react';
import * as S from './style';
interface ITitleProps {
  children : React.ReactNode;
}

export function TextBtn({ children }: ITitleProps) {
  return (
    <S.Text size={28}>{children}</S.Text>
  );
}
