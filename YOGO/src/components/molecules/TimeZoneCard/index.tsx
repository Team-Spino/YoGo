import React from 'react';
import { LocationOfTZ, TimeOfTZ } from 'components';
import { useTimeZone } from 'hooks';
import * as S from './style';

export const TimeZoneCard = ({ location }: { location: string }) => {
  const { useLiveTimer } = useTimeZone();
  const { time, meridiem, timeDifference, date, city } = useLiveTimer({
    location,
  });

  
  return (
    <S.Container>
      <LocationOfTZ timeDifference={`${date} ${timeDifference}`} city={city} time={time} meridiem={meridiem} />
      <TimeOfTZ time={time} meridiem={meridiem} isResult={false} />
    </S.Container>
  );
};