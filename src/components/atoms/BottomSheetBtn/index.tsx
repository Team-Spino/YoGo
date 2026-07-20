import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, useTheme } from '@tamagui/core';

interface IBottomSheetBtnProps {
  text: string;
  onPress: () => void | ((index: number) => void);
  isRevers?: boolean;
}

export function BottomSheetBtn({
  text,
  onPress,
  isRevers = false,
}: IBottomSheetBtnProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        height: 54,
        width: '90%',
        position: 'absolute',
        bottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: isRevers ? theme.background.val : theme.accent.val,
        shadowColor: '#4A3F9E',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: isRevers ? 0.12 : 0.25,
        shadowRadius: 14,
        zIndex: 9999,
      }}
    >
      <Text
        fontSize={16}
        fontWeight="500"
        color={isRevers ? '$accent' : '$onAccent'}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
