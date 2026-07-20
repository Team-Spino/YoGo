import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@tamagui/core';
import { ICityProps, IScheduleProps } from 'types';
import { IconDelete } from 'assets';
import { WINDOW_WIDTH } from 'styles';

interface IRenderDeleteProps {
  item: ICityProps | IScheduleProps;
  onPress: (rowKey: string | number) => void;
}

export const RenderDelete = ({ item, onPress }: IRenderDeleteProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.key)}
      style={{
        width: WINDOW_WIDTH * 0.15,
        alignItems: 'center',
        backgroundColor: '#EB5545',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
      }}
    >
      <Text color="#fff">
        <IconDelete />
      </Text>
    </TouchableOpacity>
  );
};
