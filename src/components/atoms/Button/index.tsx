import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@tamagui/core';

interface IButtonProps {
  text: string;
  onPress: () => void;
}

export function Button({ text, onPress }: IButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6564CC',
      }}
    >
      <Text fontSize={20} color="#fff">
        {text}
      </Text>
    </TouchableOpacity>
  );
}
