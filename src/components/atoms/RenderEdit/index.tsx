import React from 'react';
import { IScheduleProps } from 'types';
import { IconEdit } from 'assets';
import * as S from './style';


interface IRenderEditProps {
  item: IScheduleProps;
  onPress: (item: IScheduleProps) => void;
}

export const RenderEdit = ({ item, onPress }: IRenderEditProps) => {
  return (
    <S.RenderRightButton onPress={() => onPress(item)}
    >
        <S.RenderRightButtonText><IconEdit /></S.RenderRightButtonText>
        </S.RenderRightButton>
  );
};
