import React from 'react';
import * as S from './style';

interface ITagFilterProps {
  key: string;
  color: string;
  isSelected: boolean;
}

export function TagFilter({ tags }: { tags: ITagFilterProps }) {
  const { color, isSelected } = tags;
  return <S.Container color={color} isSelected={isSelected} />;
}
