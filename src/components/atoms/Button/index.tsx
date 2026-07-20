import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, useTheme } from '@tamagui/core';

interface IButtonProps {
  text: string;
  onPress: () => void;
}

export function Button({ text, onPress }: IButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.accent.val,
      }}
    >
      <Text fontSize={20} color="$onAccent">
        {text}
      </Text>
    </TouchableOpacity>
  );
}
