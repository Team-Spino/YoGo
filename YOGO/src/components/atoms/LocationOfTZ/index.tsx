import React from 'react';
import { IconMoon, IconSun } from 'assets';
import * as S from './style';

interface ILocationOfTZProps {
  timeDifference: string;
  city: string;
  time: string;
  meridiem: string;
}

export const LocationOfTZ = ({ timeDifference, time, meridiem, city }: ILocationOfTZProps) => {
  const checkSun = () => {
    const checkTime = +time.split(':')[0]
    if(meridiem == 'AM'){
      
      if(checkTime >= 6){
        return true
      }
      if(checkTime < 6){
        return false
      }
    }
    if(meridiem == 'PM'){
      if(checkTime >= 6){
        return false
      }
      if(checkTime < 6){
        return true
      }
    }
  }

  return (
    <S.leftDiv>
          {checkSun() && <IconSun />}
          {!checkSun() && <IconMoon />}
          <S.leftDivContainer>
          <S.leftDivHeader size={8}>{timeDifference}</S.leftDivHeader>
          <S.leftDivContent size={20}>{city}</S.leftDivContent>
          </S.leftDivContainer>
    </S.leftDiv>
  );
};