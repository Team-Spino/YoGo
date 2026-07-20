import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, useTheme } from '@tamagui/core';

interface IOnBoardingtBtnProps {
  text: string;
  onPress: () => void;
  isSkip?: boolean;
  // 마지막/엣지 슬라이드의 풀폭 CTA("Continue" 등). 에디토리얼 잉크 필 버튼을 씁니다.
  isCTA?: boolean;
}

export function OnBoardingtBtn({
  text,
  onPress,
  isSkip = false,
  isCTA = false,
}: IOnBoardingtBtnProps) {
  const theme = useTheme();

  // 풀폭 CTA — Button/InkButton 아톰과 동일한 잉크 필(높이 56/라운드 28).
  // 오프화이트 페이지 위에서 잉크 배경 + $onInk 글자로 읽힙니다.
  if (isCTA) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={{
          position: 'absolute',
          bottom: '6%',
          width: '90%',
          height: 56,
          borderRadius: 28,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.ink.val,
          zIndex: 9999,
        }}
      >
        <Text fontSize={16} fontWeight="500" color="$onInk">
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  // Skip = 서브틀 고스트 텍스트, Next = 잉크 필. 둘 다 오프화이트 페이지 위에 놓입니다.
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
        borderRadius: 999,
        backgroundColor: isSkip ? 'transparent' : theme.ink.val,
      }}
    >
      <Text
        fontSize={16}
        fontWeight="500"
        color={isSkip ? '$colorSubtle' : '$onInk'}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
