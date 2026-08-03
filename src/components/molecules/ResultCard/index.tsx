import React from 'react';
import { View, Text } from '@tamagui/core';
import { Eyebrow, Meta } from 'styles/ui';

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
    <View width="100%">
      <Eyebrow textTransform="uppercase" letterSpacing={0.6}>
        {cardHeader}
      </Eyebrow>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
        marginTop={12}
      >
        <View flex={1}>
          <Text fontSize={22} fontWeight="500" color="$color">
            {city}
          </Text>
          <Meta marginTop={4}>{date}</Meta>
        </View>
        <View flexDirection="row" alignItems="baseline">
          <Text
            color="$color"
            fontSize={46}
            fontWeight="600"
            letterSpacing={-1.8}
          >
            {time}
          </Text>
          <Text color="$colorSubtle" fontSize={15} marginLeft={5}>
            {meridiem}
          </Text>
        </View>
      </View>
    </View>
  );
};
