import React from 'react';
import { Pressable } from 'react-native';
import { View, useTheme } from '@tamagui/core';
import { IconPlus } from 'assets';

export function HeaderRightButton({ onPress }: { onPress: () => void }) {
  const theme = useTheme();
  return (
    <View overflow="hidden">
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <View
            height={48}
            width={48}
            alignItems="center"
            justifyContent="center"
            opacity={pressed ? 0.3 : 1}
          >
            <IconPlus color={theme.color.val} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
