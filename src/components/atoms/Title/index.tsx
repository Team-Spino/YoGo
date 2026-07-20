import React from 'react';
import { Text } from '@tamagui/core';

interface ITitleProps {
  isEnable: boolean;
  text: string;
  size: number;
}

export function Title({ isEnable, text, size }: ITitleProps) {
  return (
    <Text
      color={isEnable ? '#000000' : '#999999'}
      fontSize={size}
      fontWeight="bold"
    >
      {text}
    </Text>
  );
}
