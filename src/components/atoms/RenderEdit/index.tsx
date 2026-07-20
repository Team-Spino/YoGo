import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@tamagui/core';
import { IScheduleProps } from 'types';
import { IconEdit } from 'assets';
import { WINDOW_WIDTH } from 'styles';

interface IRenderEditProps {
  item: IScheduleProps;
  onPress: (item: IScheduleProps) => void;
}

export const RenderEdit = ({ item, onPress }: IRenderEditProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={{
        width: WINDOW_WIDTH * 0.15,
        alignItems: 'center',
        backgroundColor: '#F1A33C',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: WINDOW_WIDTH * 0.15,
      }}
    >
      <Text color="#fff">
        <IconEdit />
      </Text>
    </TouchableOpacity>
  );
};
