import React from 'react';
import { View } from '@tamagui/core';
import { TimeOfTZ, LocationOfTZ } from 'components';
import { Card, Eyebrow } from 'styles/ui';

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
    <Card width="86%" paddingVertical={16} paddingHorizontal={18}>
      <Eyebrow fontWeight="500" marginBottom={12}>
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
        <TimeOfTZ time={time} meridiem={meridiem} isResult={false} />
      </View>
    </Card>
  );
};
