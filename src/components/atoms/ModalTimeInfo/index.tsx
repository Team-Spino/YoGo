import React from 'react';
import { Title, SubTitle } from 'components';
import { IconRight } from 'assets';
import { getModalTimeInfo } from 'utils';
import { ITargetProps, ICurProps } from 'types';
import { useSelectedDay } from 'context';
import * as S from './style';

interface IModalTimeProps {
  timeData: {
    target: ITargetProps;
    cur: ICurProps;
  };
}

interface IModalTimerProps {
  city: string;
  date: string;
  time: string;
}

function ModalTimer({ city, date, time }: IModalTimerProps) {
  return (
    <S.Wrapper>
      <Title isEnable={true} text={city} size={20} />
      <SubTitle isEnable={true} text={date} />
      <Title isEnable={true} text={time} size={17} />
    </S.Wrapper>
  );
}

export function ModalTimeInfo({ timeData }: IModalTimeProps) {
  const { selectedDay } = useSelectedDay();

  const { target, cur } = getModalTimeInfo({ ...timeData, selectedDay });

  return (
    <S.Container>
      <ModalTimer city={target.city} date={target.date} time={target.time} />
      <IconRight />
      <ModalTimer city={cur.city} date={cur.date} time={cur.time} />
    </S.Container>
  );
}
