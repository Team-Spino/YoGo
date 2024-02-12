import React from 'react';
import { Pressable } from 'react-native';
import { IconPlus } from 'assets';
import * as S from './style';

export function HeaderRightButton({
  name,
  color,
  onPress,
}: {
  name: string;
  color: string;
  onPress: any;
}) {
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

HeaderRightButton.defaultProps = {
  color: '#6200ee',
};
