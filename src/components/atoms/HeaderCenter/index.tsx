import React from 'react';
import { View, Text } from '@tamagui/core';

interface IHeaderCenterProps {
  text: string;
  size: number;
}

export function HeaderCenter({ text, size }: IHeaderCenterProps) {
  return (
    <View width="100%">
      <Text
        color="$color"
        fontSize={size}
        fontWeight="bold"
        marginTop={30}
        alignSelf="center"
      >
        {text}
      </Text>
    </View>
  );
}
