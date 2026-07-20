import React from 'react';
import { Pressable } from 'react-native';
import { View } from '@tamagui/core';
import { IconPlus } from 'assets';

export function HeaderRightButton({ onPress }: { onPress: () => void }) {
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
            <IconPlus color="#231F20" />
          </View>
        )}
      </Pressable>
    </View>
  );
}
