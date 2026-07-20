import React from 'react';
import { View, Text } from '@tamagui/core';
import { HairRow, Meta } from 'styles/ui';
import { formatCityName } from 'utils';
import { useTimeZone } from 'hooks';

export const TimeZoneCard = ({ location }: { location: string }) => {
  const { useLiveTimer } = useTimeZone();
  const { time, meridiem, timeDifference, date, city } = useLiveTimer({
    location,
  });

  return (
    <View
      height="100%"
      justifyContent="center"
      paddingHorizontal={20}
      backgroundColor="$background"
    >
      <HairRow>
        <View flex={1}>
          <Text fontSize={21} fontWeight="500" color="$color">
            {formatCityName(city)}
          </Text>
          <Meta marginTop={4}>{formatCityName(`${date} ${timeDifference}`)}</Meta>
        </View>
        <View flexDirection="row" alignItems="baseline">
          <Text
            fontSize={40}
            fontWeight="600"
            color="$color"
            letterSpacing={-1.6}
          >
            {time}
          </Text>
          <Text fontSize={14} color="$colorSubtle" marginLeft={5}>
            {meridiem}
          </Text>
        </View>
      </HairRow>
    </View>
  );
};
