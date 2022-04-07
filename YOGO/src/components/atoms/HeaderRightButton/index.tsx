import React from 'react';
import { StyleSheet, View, Pressable, Platform } from 'react-native';
import * as S from './style';
import { IconPlus } from 'assets';

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
      <Pressable>
        {({ pressed }) => (
          <S.Button pressed={pressed}>
            <IconPlus />
          </S.Button>
        )}
      </Pressable>
    </S.Wrapper>
  );
}

HeaderRightButton.defaultProps = {
  color: '#6200ee',
};
