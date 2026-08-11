import React from 'react';
import { View, Text } from '@tamagui/core';

interface IRenderEmptyDataProps {
  text: string;
  hint?: string;
}

export function RenderEmptyData({
  text,
  hint = 'Tap + to add your first one',
}: IRenderEmptyDataProps) {
  return (
    <View flex={1} alignItems="center" justifyContent="center" gap={8}>
      <Text color="$color" fontSize={22} fontWeight="500" letterSpacing={-0.4}>
        {text}
      </Text>
      <Text color="$colorSubtle" fontSize={14}>
        {hint}
      </Text>
    </View>
  );
}
