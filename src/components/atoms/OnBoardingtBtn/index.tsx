import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, useTheme } from '@tamagui/core';

interface IOnBoardingtBtnProps {
  text: string;
  onPress: () => void;
  isSkip?: boolean;
  // 마지막/엣지 슬라이드의 풀폭 CTA("Continue" 등). 보라 배경 위라 반전 스타일을 씁니다.
  isCTA?: boolean;
}

export function OnBoardingtBtn({
  text,
  onPress,
  isSkip = false,
  isCTA = false,
}: IOnBoardingtBtnProps) {
  const theme = useTheme();

  // 풀폭 CTA — Button 아톰과 같은 라운드(16)/높이(54). 보라 배경 위에서 읽히도록
  // 배경을 $onAccent(흰색), 글자를 $accent로 반전합니다.
  if (isCTA) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={{
          position: 'absolute',
          bottom: '6%',
          width: '90%',
          height: 54,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.onAccent.val,
          shadowColor: '#4A3F9E',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.2,
          shadowRadius: 14,
          zIndex: 9999,
        }}
      >
        <Text fontSize={16} fontWeight="500" color="$accent">
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  // Skip = 고스트 텍스트, Next = 반전된 라운드 필. 둘 다 보라 배경 위에 놓입니다.
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        position: 'absolute',
        bottom: '6%',
        ...(isSkip ? { left: '6%' } : { right: '6%' }),
        paddingVertical: isSkip ? 12 : 13,
        paddingHorizontal: isSkip ? 14 : 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: isSkip ? 'transparent' : theme.onAccent.val,
      }}
    >
      <Text
        fontSize={16}
        fontWeight="500"
        opacity={isSkip ? 0.7 : 1}
        color={isSkip ? '$onAccent' : '$accent'}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
