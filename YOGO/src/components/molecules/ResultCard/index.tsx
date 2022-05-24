import React from 'react';
import { TimeOfTZ, LocationOfTZ } from 'components';
import { formatCityName } from 'utils';
import * as S from './style';

interface IResultCardProps {
  cardHeader : string;
  city: string | undefined;
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
    <S.Container>
      <S.CardHeaderBox>
        <S.CardHeaderText>{cardHeader}</S.CardHeaderText>
      </S.CardHeaderBox>
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
