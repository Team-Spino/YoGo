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
      activeOpacity={0.85}
      style={{
        width: '100%',
        height: 54,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.accent.val,
        shadowColor: '#4A3F9E',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 14,
      }}
    >
      <Text fontSize={16} fontWeight="500" color="$onAccent">
        {text}
      </Text>
    </TouchableOpacity>
  );
}
