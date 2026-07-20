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
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <View
        width={56}
        height={56}
        borderRadius={28}
        alignItems="center"
        justifyContent="center"
        backgroundColor="#6564CC"
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};
