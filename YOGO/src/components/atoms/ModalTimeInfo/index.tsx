import React from 'react';
import { Title, SubTitle } from 'components';
import { IconRight } from 'assets';
import * as S from './style';

interface IModalTimerProps {
  city: string;
  date: string;
  time: string;
}

function ModalTimer({ city, date, time }: IModalTimerProps) {
  return (
    <S.Wrapper>
      <Title isEnable={true} text={city} size={25} />
      <SubTitle isEnable={true} text={date} />
      <Title isEnable={true} text={time} size={20} />
    </S.Wrapper>
  );
}

export function ModalTimeInfo() {
  return (
    <S.Container>
      <ModalTimer city={'Seoul'} date={'2020.03.21'} time={'02:00 am'} />
      <IconRight />
      <ModalTimer city={'London'} date={'2020.03.21'} time={'04:00 pm'} />
    </S.Container>
  );
}
