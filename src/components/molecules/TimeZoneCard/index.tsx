import React from 'react';
import { View } from '@tamagui/core';
import { LocationOfTZ, TimeOfTZ } from 'components';
import { Card } from 'styles/ui';
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
      paddingHorizontal={16}
      paddingVertical={6}
      backgroundColor="$background"
    >
      <Card
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={16}
      >
        <LocationOfTZ
          timeDifference={`${date} ${timeDifference}`}
          city={city}
          time={time}
          meridiem={meridiem}
        />
        <TimeOfTZ time={time} meridiem={meridiem} isResult={false} />
      </Card>
    </View>
  );
};
