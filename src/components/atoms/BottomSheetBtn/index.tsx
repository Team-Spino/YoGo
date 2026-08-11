import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from '@tamagui/core';

interface IBottomSheetBtnProps {
  text: string;
  onPress: () => void | ((index: number) => void);
  isRevers?: boolean;
}

export function BottomSheetBtn({ text, onPress }: IBottomSheetBtnProps) {
  const theme = useTheme();

  // 절대배치 래퍼가 좌우 끝(left:0/right:0)을 잡고 내부 버튼을 가운데 정렬합니다.
  // 이렇게 하면 부모의 paddingHorizontal 값과 무관하게 버튼이 항상 화면 중앙에
  // 옵니다. 버튼에 직접 position:absolute + width:'90%'만 주면 부모 패딩이
  // 더해지며 왼쪽으로 쏠립니다.
  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 24,
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={{
          height: 56,
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 28,
          backgroundColor: theme.ink.val,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 14,
        }}
      >
        <Text fontSize={16} fontWeight="500" color="$onInk">
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
