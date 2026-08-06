import React from 'react';
import { Text } from '@tamagui/core';

interface ITitleProps {
  children: React.ReactNode;
}

export function TextBtn({ children }: ITitleProps) {
  return (
    <Text fontSize={20} color="$color" fontWeight="400" numberOfLines={1}>
      {children}
    </Text>
  );
}
