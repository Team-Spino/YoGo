import React from 'react';
import { ITagFilterProps } from 'types';
import * as S from './style';

export function TagFilter({ tags }: { tags: ITagFilterProps }) {
  const { color, isSelected } = tags;
  return <S.Container color={color} isSelected={isSelected} />;
}
