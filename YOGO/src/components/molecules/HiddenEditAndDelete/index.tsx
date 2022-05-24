import React from 'react';
import { RenderDelete, RenderEdit } from 'components';
import { IScheduleProps } from 'types';
import * as S from './style';

interface IProps {
  item: IScheduleProps;
  onPressDelete: (rowKey: string) => void;
  onPressEdit: (item: IScheduleProps) => void;
}

export const HiddenEditAndDelete = ({
  item,
  onPressDelete,
  onPressEdit,
}: IProps) => {
  return (
    <S.Container>
      <RenderDelete item={item} onPress={onPressDelete} />
      <RenderEdit item={item} onPress={onPressEdit} />
    </S.Container>
  );
};
