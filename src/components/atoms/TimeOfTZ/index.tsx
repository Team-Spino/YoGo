import React from 'react';
import { View, Text } from '@tamagui/core';

interface ITimeOfTZProps {
  time: string;
  meridiem: string;
  isResult: boolean;
}

export const TimeOfTZ = ({ time, meridiem, isResult }: ITimeOfTZProps) => {
  const size = isResult
    ? {
        time: 50,
        meridiem: 50,
      }
    : {
        time: 32,
        meridiem: 16,
      };
  return (
    <View justifyContent="flex-end" flexDirection="row" alignItems="baseline">
      <Text color="$color" fontSize={size.time}>
        {time}
      </Text>
      <Text color="$color" marginLeft={5} fontSize={size.meridiem}>
        {meridiem}
      </Text>
    </View>
  );
};
