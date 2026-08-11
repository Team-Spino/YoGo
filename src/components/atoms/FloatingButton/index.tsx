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
      // 화면(탭 씬)은 이미 탭바 위에서 끝나므로, 화면 기준 bottom만 주면 탭바 바로
      // 위에 놓입니다. 탭바 높이를 더하면 이중 계산으로 너무 위로 떠버립니다.
      style={{
        position: 'absolute',
        bottom: 24,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
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
        backgroundColor="$ink"
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};
