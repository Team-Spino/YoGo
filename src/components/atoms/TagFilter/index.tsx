import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ITagFilterProps, ITagFilter } from 'types';

export function TagFilter({ tag, onTagPress }: ITagFilterProps) {
  const { key, color, isSelected } = tag as ITagFilter;

  return (
    <TouchableOpacity
      onPress={() => onTagPress(key)}
      style={{
        width: 18,
        height: 18,
        borderRadius: 18,
        backgroundColor: color,
        borderWidth: 3,
        borderColor: isSelected ? '#6564CC' : 'transparent',
      }}
    />
  );
}
