import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, useTheme } from '@tamagui/core';
import { ITagFilterProps, ITagFilter } from 'types';

/**
 * 색 필터 점. 선택되면 잉크색 링이 점을 감쌉니다(에디토리얼 톤).
 */
export function TagFilter({ tag, onTagPress }: ITagFilterProps) {
  const { key, color, isSelected } = tag as ITagFilter;
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={() => onTagPress(key)} hitSlop={8}>
      <View
        width={26}
        height={26}
        borderRadius={999}
        alignItems="center"
        justifyContent="center"
        borderWidth={1.5}
        borderColor={isSelected ? theme.color.val : 'transparent'}
      >
        <View width={15} height={15} borderRadius={999} backgroundColor={color} />
      </View>
    </TouchableOpacity>
  );
}
