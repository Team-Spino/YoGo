import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@tamagui/core';
import { ITagFilterProps, ITagFilter } from 'types';

export function TagFilter({ tag, onTagPress }: ITagFilterProps) {
  const { key, color, isSelected } = tag as ITagFilter;
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => onTagPress(key)}
      style={{
        width: 18,
        height: 18,
        borderRadius: 18,
        backgroundColor: color,
        borderWidth: 3,
        borderColor: isSelected ? theme.accent.val : 'transparent',
      }}
    />
  );
}
