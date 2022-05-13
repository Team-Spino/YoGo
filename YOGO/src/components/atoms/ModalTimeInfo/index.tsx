import React from 'react';
import { Title, SubTitle } from 'components';
import { IconRight } from 'assets';
import { ITargetProps, ICurProps } from 'types';
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
  const { target, cur } = timeData;

  const { TARGET_TIME, TARGET_CITY, TARGET_DAY } = target;
  const { CUR_TIME, CUR_CITY, CUR_DAY } = cur;

  return (
    <S.Container>
      <ModalTimer city={TARGET_CITY} date={TARGET_DAY} time={TARGET_TIME} />
      <IconRight />
      <ModalTimer city={CUR_CITY} date={CUR_DAY} time={CUR_TIME} />
    </S.Container>
  );
}
