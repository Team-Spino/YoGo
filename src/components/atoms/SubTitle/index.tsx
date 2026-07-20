import React from 'react';
import { Text } from '@tamagui/core';

interface ISubTitleProps {
  isEnable: boolean;
  text: string;
}

export function SubTitle({ isEnable, text }: ISubTitleProps) {
  return (
    <Text fontSize={16} color={isEnable ? '$color' : '$colorSubtle'} marginBottom={6}>
      {text}
    </Text>
  );
}
