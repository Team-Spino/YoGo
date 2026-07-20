import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, useTheme } from '@tamagui/core';

interface IBottomSheetBtnProps {
  text: string;
  onPress: () => void | ((index: number) => void);
  isRevers?: boolean;
}

export function BottomSheetBtn({ text, onPress }: IBottomSheetBtnProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        height: 56,
        width: '90%',
        position: 'absolute',
        bottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        backgroundColor: theme.ink.val,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
        zIndex: 9999,
      }}
    >
      <Text fontSize={16} fontWeight="500" color="$onInk">
        {text}
      </Text>
    </TouchableOpacity>
  );
}
