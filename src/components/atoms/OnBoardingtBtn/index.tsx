import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@tamagui/core';

interface IOnBoardingtBtnProps {
  text: string;
  onPress: () => void;
  isSkip?: boolean;
}

export function OnBoardingtBtn({ text, onPress, isSkip = false }: IOnBoardingtBtnProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: '5%',
        width: '20%',
        position: 'absolute',
        bottom: '5%',
        ...(isSkip ? { left: '5%' } : { right: '5%' }),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: !isSkip ? '#FCFCFC' : '#6564CC',
      }}
    >
      <Text
        fontSize={20}
        fontWeight="bold"
        opacity={isSkip ? 0.5 : 1}
        color={!isSkip ? '#6564CC' : '#FCFCFC'}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
