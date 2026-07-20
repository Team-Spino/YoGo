import React from 'react';
import { View, Text } from '@tamagui/core';
import { LocationOfTZ } from 'components';
import { Eyebrow } from 'styles/ui';

interface IResultCardProps {
  cardHeader: string;
  city: string;
  date: string;
  time: string;
  meridiem: string;
}

export const ResultCard = ({
  cardHeader,
  city,
  date,
  time,
  meridiem,
}: IResultCardProps) => {
  return (
    <View width="100%" paddingVertical={8}>
      <Eyebrow fontWeight="500" marginBottom={14}>
        {cardHeader}
      </Eyebrow>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <LocationOfTZ
          timeDifference={city}
          city={date}
          time={time}
          meridiem={meridiem}
          isResult={true}
        />
        <View flexDirection="row" alignItems="baseline">
          <Text
            color="$color"
            fontSize={48}
            fontWeight="600"
            letterSpacing={-2}
          >
            {time}
          </Text>
          <Text color="$colorSubtle" fontSize={16} marginLeft={6}>
            {meridiem}
          </Text>
        </View>
      </View>
    </View>
  );
};
