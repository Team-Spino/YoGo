import React from 'react';
import { Text } from '@tamagui/core';

interface ITitleProps {
  isEnable: boolean;
  text: string;
  size: number;
}

export function CardTitle({ isEnable, text, size }: ITitleProps) {
  return (
    <Text
      color={isEnable ? '#000000' : '#999999'}
      fontSize={size}
      fontWeight="bold"
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {text}
    </Text>
  );
}
