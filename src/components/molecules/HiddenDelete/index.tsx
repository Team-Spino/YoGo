import React from 'react';
import { View } from '@tamagui/core';
import { RenderDelete } from 'components';
import { ICityProps } from 'types';
interface IHideenDeleteProps {
  item: ICityProps;
  onPress: (rowKey: string | number) => void;
}

export const HiddenDelete = ({ item, onPress }: IHideenDeleteProps) => {
  return (
    <View
      alignItems="center"
      backgroundColor="#EB5545"
      flex={1}
      justifyContent="space-between"
    >
      <RenderDelete item={item} onPress={onPress} />
    </View>
  );
};
