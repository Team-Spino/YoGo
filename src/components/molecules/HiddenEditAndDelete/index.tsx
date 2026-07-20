import React from 'react';
import { View } from '@tamagui/core';
import { RenderDelete, RenderEdit } from 'components';
import { IScheduleProps } from 'types';

interface IProps {
  item: IScheduleProps;
  onPressDelete: (rowKey: string | number) => void;
  onPressEdit: (item: IScheduleProps) => void;
}

export const HiddenEditAndDelete = ({
  item,
  onPressDelete,
  onPressEdit,
}: IProps) => {
  return (
    <View alignItems="center" backgroundColor="#EEEEEE" flex={1}>
      <RenderDelete item={item} onPress={onPressDelete} />
      <RenderEdit item={item} onPress={onPressEdit} />
    </View>
  );
};
