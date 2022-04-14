import React from 'react';
import { Title, SubTitle } from 'components';
import { IconRight } from 'assets';
import { ICur, ITarget } from 'types';
import * as S from './style';

interface IModalTimeProps {
  timeData: {
    target: ITarget;
    cur: ICur;
  };
}

interface IModalTimerProps {
  city: string;
  date: string;
  time: string;
}

function ModalTimer({ city, date, time }: IModalTimerProps) {
  console.log(city, date, time);
  return (
    <S.Wrapper>
      <Title isEnable={true} text={city} size={25} />
      <SubTitle isEnable={true} text={date} />
      <Title isEnable={true} text={time} size={20} />
    </S.Wrapper>
  );
}

export function ModalTimeInfo({ timeData }: IModalTimeProps) {
  const { target, cur } = timeData;
  return (
    <S.Container>
      <ModalTimer city={cur.local} date={cur.day} time={cur.time} />
      <IconRight />
      <ModalTimer city={target.local} date={target.day} time={target.time} />
    </S.Container>
  );
}
