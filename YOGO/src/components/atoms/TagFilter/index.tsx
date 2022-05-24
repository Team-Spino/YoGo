import React from 'react';
import { ITagFilterProps, ITagFilter } from 'types';
import * as S from './style';

export function TagFilter({ tag, onTagPress }: ITagFilterProps) {
  const { key, color, isSelected } = tag as ITagFilter;

  return (
    <S.Container
      color={color}
      isSelected={isSelected}
      onPress={() => onTagPress(key)}
    />
  );
}
