import React from 'react';
import { IScheduleProps } from '~/types';
import * as S from './style';

interface IRenderDeleteProps {
  item: IScheduleProps
  onPress: (key: number) => void;
}

export const RenderDelete = ({item, onPress} : IRenderDeleteProps) => {
  return (
    <S.RenderRightButton onPress={() => onPress(item.key)}
    >
        <S.RenderRightButtonText>Delete</S.RenderRightButtonText>
        </S.RenderRightButton>
  );
};
