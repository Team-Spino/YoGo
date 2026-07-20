import React from 'react';
import { View, Text } from '@tamagui/core';
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
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={4}
    >
      <Text color="$color" fontSize={15} fontWeight="500" numberOfLines={1}>
        {city}
      </Text>
      <Text
        color="$color"
        fontSize={20}
        fontWeight="500"
        letterSpacing={-0.3}
        numberOfLines={1}
      >
        {time}
      </Text>
      <Text color="$colorSubtle" fontSize={12} numberOfLines={1}>
        {date}
      </Text>
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
      gap={12}
    >
      <ModalTimer city={target.city} date={target.date} time={target.time} />
      <IconRight />
      <ModalTimer city={cur.city} date={cur.date} time={cur.time} />
    </View>
  );
}
