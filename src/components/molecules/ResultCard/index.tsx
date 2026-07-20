import React from 'react';
import { View, Text } from '@tamagui/core';
import { TimeOfTZ, LocationOfTZ } from 'components';

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
    <View
      width="80%"
      height="15%"
      borderWidth={1}
      borderColor="$accent"
      flexDirection="row"
      justifyContent="space-between"
      paddingVertical={0}
      paddingHorizontal={20}
      alignItems="center"
      backgroundColor="$background"
      marginTop={18}
      borderRadius={5}
    >
      <View
        position="absolute"
        backgroundColor="$accent"
        borderRadius={5}
        paddingVertical={2}
        paddingHorizontal={10}
        borderWidth={1}
        borderColor="$background"
        top="-15%"
        left="2%"
      >
        <Text color="$onAccent">{cardHeader}</Text>
      </View>
      <LocationOfTZ
        timeDifference={city}
        city={date}
        time={time}
        meridiem={meridiem}
        isResult={true}
      />
      <TimeOfTZ time={time} meridiem={meridiem} isResult={false} />
    </View>
  );
};
