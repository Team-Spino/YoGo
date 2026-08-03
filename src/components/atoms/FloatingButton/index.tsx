import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { View } from '@tamagui/core';

interface IFloatingButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export const FloatingButton = ({ children, onPress }: IFloatingButtonProps) => {
  // 탭바 바로 위에 확실히 뜨도록, 탭바 높이만큼 띄웁니다(겹침 방지).
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: tabBarHeight + 16,
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
