import React from 'react';
import { View, Text } from '@tamagui/core';

interface IDayOfWeekProps {
  isEnable: boolean;
  selectedDay: Array<string>;
}

export function DayOfWeek({ isEnable, selectedDay }: IDayOfWeekProps) {
  const DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateColor = ({ day }: { day: string }): string => {
    if (!isEnable) {
      return '$borderColor';
    }

    return selectedDay.includes(day) ? '$accent' : '$borderColor';
  };

  return (
    <View flexDirection="row" marginLeft={21}>
      {DAY_OF_WEEK.map(day => (
        <Text key={day} color={handleDateColor({ day })} marginRight={5}>
          {day.substring(0, 1)}
        </Text>
      ))}
    </View>
  );
}
