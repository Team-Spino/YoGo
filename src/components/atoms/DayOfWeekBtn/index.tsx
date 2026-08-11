import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, useTheme } from '@tamagui/core';
import { IDayOfWeekProps } from 'types';

interface IDayOfWeekBtnProps {
  day: IDayOfWeekProps;
  onDaySelect: (key: string) => void;
}

export function DayOfWeekBtn({ day, onDaySelect }: IDayOfWeekBtnProps) {
  const { key, name, isSelected } = day;
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={() => onDaySelect(key)}
      style={{
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: isSelected ? theme.accent.val : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text fontSize={12} fontWeight="bold" color={isSelected ? '$onAccent' : '$color'}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
