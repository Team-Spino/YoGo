import React from 'react';
import { IconTick } from 'assets';
import { ITagListProps } from 'types';
import * as S from './style';

interface ITagSelectProps {
  tag: ITagListProps;
  onSelectTag: (key: string) => void;
  isFilter: boolean;
}

export function TagSelect({ tag, onSelectTag, isFilter }: ITagSelectProps) {
  const { key, color, isSelected } = tag;

  const size = isFilter ? '20px' : '25px';

  return (
    <>
      {!isSelected ? (
        <S.Container
          color={color}
          onPress={() => onSelectTag(key)}
          size={size}
        />
      ) : (
        <S.Container color={color} size={size}>
          <IconTick />
        </S.Container>
      )}
    </>
  );
}
