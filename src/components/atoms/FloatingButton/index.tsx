import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from '@tamagui/core';

interface IFloatingButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export const FloatingButton = ({ children, onPress }: IFloatingButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: 15,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        shadowColor: '#4A3F9E',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
      }}
    >
      <View
        width={56}
        height={56}
        borderRadius={28}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$accent"
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};
