import React from 'react';
import { RenderDelete } from 'components';
import { ICityProps } from 'types';
import * as S from './style';
interface IHideenDeleteProps {
  item: ICityProps;
  onPress: (rowKey: string | number) => void;
}

export const HiddenDelete = ({ item, onPress }: IHideenDeleteProps) => {
  return (
    <S.Container>
      <RenderDelete item={item} onPress={onPress} />
    </S.Container>
  );
};
