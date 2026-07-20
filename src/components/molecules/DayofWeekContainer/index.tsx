import React from 'react';
import { View } from '@tamagui/core';
import { Title, DayOfWeekBtn } from 'components';
import { IDayOfWeekProps } from 'types';

interface ITagSelectContainerProps {
  dayOfWeek: Array<IDayOfWeekProps>;
  onDaySelect: (key: string) => void;
}

export function DayOfWeekContainer({
  dayOfWeek,
  onDaySelect,
}: ITagSelectContainerProps) {
  return (
    <View
      width="100%"
      paddingVertical={16}
      paddingHorizontal={16}
      borderRadius={16}
      borderWidth={0.5}
      borderColor="$borderColor"
      backgroundColor="$backgroundStrong"
    >
      <Title isEnable={true} text={'Select a Day of the week to repeat'} size={15} />
      <View
        width="100%"
        flexDirection="row"
        justifyContent="space-evenly"
        marginTop={16}
      >
        {dayOfWeek.map((day: IDayOfWeekProps) => (
          <DayOfWeekBtn key={day.key} day={day} onDaySelect={onDaySelect} />
        ))}
      </View>
    </View>
  );
}
