import React from 'react';
import { Pressable } from 'react-native';
import * as S from './style';

export const FloatingButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <S.Wrapper>
      <Pressable>
        {({ pressed }) => <S.Button pressed={pressed}>{children}</S.Button>}
      </Pressable>
    </S.Wrapper>
  );
};
