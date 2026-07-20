import React from 'react';
import { View, Text } from '@tamagui/core';
import { formatCityName } from 'utils';
import { IconMoon, IconSun } from 'assets';

interface ILocationOfTZProps {
  timeDifference: string;
  city: string;
  time: string;
  meridiem: string;
  isResult?: boolean;
}

export const LocationOfTZ = ({
  timeDifference,
  time,
  meridiem,
  city,
  isResult = false,
}: ILocationOfTZProps) => {
  const checkSun = () => {
    const checkTime = +time.split(':')[0];
    if (meridiem == 'AM') {
      return checkTime >= 6 && checkTime < 12 ? true : false;
    }
    return checkTime >= 6 && checkTime < 12 ? false : true;
  };

  const headerSize = isResult ? 18 : 9;

  return (
    <View flexDirection="row" justifyContent="center" alignItems="center">
      {checkSun() && <IconSun />}
      {!checkSun() && <IconMoon />}
      <View
        alignContent="space-between"
        justifyContent="flex-start"
        flexDirection="column"
        paddingLeft={10}
      >
        <Text flexShrink={1} fontSize={headerSize} color="$accent">
          {formatCityName(timeDifference)}
        </Text>
        <Text fontSize={22}>{formatCityName(city)}</Text>
      </View>
    </View>
  );
};
