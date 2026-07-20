import React from 'react';
import { Text } from '@tamagui/core';

interface ITitleProps {
  children: React.ReactNode;
}

export function TextBtn({ children }: ITitleProps) {
  return (
    <Text width="90%" fontSize={28} color="#000000" fontWeight="200">
      {children}
    </Text>
  );
}
