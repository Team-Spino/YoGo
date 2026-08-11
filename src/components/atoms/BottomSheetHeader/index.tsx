import React from 'react';
import { Text } from '@tamagui/core';

interface IBHearderProps {
  text: string;
  size: number;
  isWhite?: boolean;
}

export function BottomSheetHeader({
  text,
  size,
  isWhite = false,
}: IBHearderProps) {
  return (
    <Text
      fontSize={size}
      fontWeight="bold"
      marginBottom={5}
      alignItems="center"
      justifyContent="center"
      color={isWhite ? '$onAccent' : '$color'}
    >
      {text}
    </Text>
  );
}
