import React from 'react';
import * as S from './style';

interface IFloatingButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export const FloatingButton = ({ children, onPress }: IFloatingButtonProps) => {
  return (
    <S.Container onPress={onPress}>
      <S.Button>{children}</S.Button>
    </S.Container>
  );
};
