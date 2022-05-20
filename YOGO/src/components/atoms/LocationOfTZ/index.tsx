import React from 'react';
import { IconMoon, IconSun } from 'assets';
import * as S from './style';

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
    <S.leftDiv>
      {checkSun() && <IconSun />}
      {!checkSun() && <IconMoon />}
      <S.leftDivContainer>
        <S.leftDivHeader size={headerSize}>{timeDifference}</S.leftDivHeader>
        <S.leftDivContent size={22}>{city}</S.leftDivContent>
      </S.leftDivContainer>
    </S.leftDiv>
  );
};
