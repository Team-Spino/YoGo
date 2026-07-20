import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@tamagui/core';
import { IDayOfWeekProps } from 'types';

interface IDayOfWeekBtnProps {
  day: IDayOfWeekProps;
  onDaySelect: (key: string) => void;
}

export function DayOfWeekBtn({ day, onDaySelect }: IDayOfWeekBtnProps) {
  const { key, name, isSelected } = day;
  return (
    <TouchableOpacity
      onPress={() => onDaySelect(key)}
      style={{
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: isSelected ? '#6564CC' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text fontSize={12} fontWeight="bold" color={isSelected ? '#ffffff' : '#000000'}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
