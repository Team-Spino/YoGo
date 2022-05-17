import React from 'react';
import { IScheduleProps } from 'types';
import * as S from './style';


interface IRenderEditProps {
  item: IScheduleProps
  onPress: (item : IScheduleProps) => void;
}

export const RenderEdit = ({item, onPress} : any) => {
  return (
    <S.RenderRightButton onPress={() => onPress(item)}
    >
        <S.RenderRightButtonText>Edit</S.RenderRightButtonText>
        </S.RenderRightButton>
  );
};
