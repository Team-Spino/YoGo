import React from 'react';
import { View } from '@tamagui/core';
import { DayOfWeekBtn } from 'components';
import { Eyebrow } from 'styles/ui';
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
    <View width="100%" paddingVertical={18}>
      <Eyebrow textTransform="uppercase" letterSpacing={0.6} fontWeight="500">
        Repeat on
      </Eyebrow>
      <View
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        marginTop={18}
      >
        {dayOfWeek.map((day: IDayOfWeekProps) => (
          <DayOfWeekBtn key={day.key} day={day} onDaySelect={onDaySelect} />
        ))}
      </View>
    </View>
  );
}
