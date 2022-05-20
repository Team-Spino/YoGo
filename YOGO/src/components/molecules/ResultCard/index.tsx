import React from 'react';
import { TimeOfTZ, LocationOfTZ } from 'components';
import { formatCityName } from 'utils';
import * as S from './style';

interface IResultCardProps {
  city: any;
  date: string;
  time: string;
  meridiem: string;
}

export const ResultCard = ({
  city,
  date,
  time,
  meridiem,
}: IResultCardProps) => {
  return (
    <S.Container>
      <LocationOfTZ
        timeDifference={city}
        city={date}
        time={time}
        meridiem={meridiem}
        isResult={true}
      />
      <TimeOfTZ time={time} meridiem={meridiem} isResult={false} />
    </S.Container>
  );
};
