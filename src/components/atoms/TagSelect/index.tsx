import React from 'react';
import { IconTick } from 'assets';
import { ITagListProps } from 'types';
import * as S from './style';

interface ITagSelectProps {
  tag: ITagListProps;
  onSelectTag: (key: string) => void;
}

export function TagSelect({ tag, onSelectTag }: ITagSelectProps) {
  const { key, color, isSelected } = tag;

  return (
    <>
      {!isSelected && (
        <S.Container color={color} onPress={() => onSelectTag(key)} />
      )}
      {isSelected && (
        <S.Container color={color}>
          <IconTick />
        </S.Container>
      )}
    </>
  );
}
