import React from 'react';
import { View } from '@tamagui/core';

export function IconAbsolute({ children }: { children: React.ReactNode }) {
  return (
    <View
      width="100%"
      position="absolute"
      top="15%"
      left="-16%"
      opacity={0.4}
    >
      {children}
    </View>
  );
}
