import React from 'react';
import { View, Text } from '@tamagui/core';
import { Eyebrow, Meta } from 'styles/ui';
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
      gap={8}
    >
      <Eyebrow numberOfLines={1}>{city}</Eyebrow>
      <Text
        color="$color"
        fontSize={34}
        fontWeight="600"
        letterSpacing={-1.4}
        numberOfLines={1}
      >
        {time}
      </Text>
      <Meta numberOfLines={1}>{date}</Meta>
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
      <Text color="$colorSubtle" fontSize={22} fontWeight="400">
        →
      </Text>
      <ModalTimer city={cur.city} date={cur.date} time={cur.time} />
    </View>
  );
}
