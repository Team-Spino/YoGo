import React from 'react';
import { Pressable } from 'react-native';
import { IconPlus } from 'assets';
import * as S from './style';

export function HeaderRightButton({ onPress }: { onPress: () => void }) {
  return (
    <S.Wrapper>
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <S.Button pressed={pressed}>
            <IconPlus color="#231F20" />
          </S.Button>
        )}
      </Pressable>
    </S.Wrapper>
  );
}
