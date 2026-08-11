import React from 'react';
import { View } from '@tamagui/core';

export function Tag({ color }: { color: string }) {
  return (
    <View
      height={25}
      width={5}
      marginRight={10}
      backgroundColor={color}
      borderTopLeftRadius={5}
      borderTopRightRadius={5}
      borderBottomLeftRadius={5}
      borderBottomRightRadius={5}
    />
  );
}
