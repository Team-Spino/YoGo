import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@tamagui/core';

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
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: '5%',
        width: '90%',
        position: 'absolute',
        bottom: '4.5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: isRevers ? '#FCFCFC' : '#6564CC',
        zIndex: 9999,
      }}
    >
      <Text
        fontSize={20}
        fontWeight="bold"
        color={isRevers ? '#6564CC' : '#FCFCFC'}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
