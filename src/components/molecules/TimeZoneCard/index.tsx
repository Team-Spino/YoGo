import React from 'react';
import { View } from '@tamagui/core';
import { LocationOfTZ, TimeOfTZ } from 'components';
import { useTimeZone } from 'hooks';

export const TimeZoneCard = ({ location }: { location: string }) => {

  const { useLiveTimer } = useTimeZone();
  const { time, meridiem, timeDifference, date, city } = useLiveTimer({
    location,
  });

  return (
    <View
      width="100%"
      height="100%"
      backgroundColor="$background"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      flexShrink={1}
      borderBottomColor="$borderColor"
      borderBottomWidth={1}
      paddingHorizontal={15}
    >
      <LocationOfTZ
        timeDifference={`${date} ${timeDifference}`}
        city={city}
        time={time}
        meridiem={meridiem}
      />
      <TimeOfTZ time={time} meridiem={meridiem} isResult={false} />
    </View>
  );
};
