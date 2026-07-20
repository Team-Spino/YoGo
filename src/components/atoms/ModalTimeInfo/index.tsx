import React from 'react';
import { View } from '@tamagui/core';
import { Title, SubTitle } from 'components';
import { IconRight } from 'assets';
import { getModalTimeInfo } from 'utils';
import { ITargetProps, ICurProps } from 'types';
import { useSelectedDay } from 'context';

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
    <View justifyContent="center" alignItems="center" flexDirection="column">
      <Title isEnable={true} text={city} size={20} />
      <SubTitle isEnable={true} text={date} />
      <Title isEnable={true} text={time} size={17} />
    </View>
  );
}

export function ModalTimeInfo({ timeData }: IModalTimeProps) {
  const { selectedDay } = useSelectedDay();

  const { target, cur } = getModalTimeInfo({ ...timeData, selectedDay });

  return (
    <View
      width="100%"
      justifyContent="space-evenly"
      alignItems="center"
      flexDirection="row"
    >
      <ModalTimer city={target.city} date={target.date} time={target.time} />
      <IconRight />
      <ModalTimer city={cur.city} date={cur.date} time={cur.time} />
    </View>
  );
}
