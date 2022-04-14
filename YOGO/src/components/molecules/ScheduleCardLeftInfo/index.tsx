import React from 'react';
import { View } from 'react-native';
import { Tag, Title, SubTitle, DayOfWeek } from 'components';
import { ITarget } from 'types';
import * as S from './style';

interface IScheduleCardLeftInfoProps {
  isEnable: boolean;
  data: {
    title: string;
    tagColor: string;
    target: ITarget;
    dayOfWeek: string[];
  };
}

export function ScheduleCardLeftInfo({
  isEnable,
  data,
}: IScheduleCardLeftInfoProps) {
  const { title, tagColor, target, dayOfWeek } = data;
  const { time, local } = target;

  return (
    <S.Container>
      <Tag color={tagColor} margin={5} />
      <View>
        <Title isEnable={isEnable} size={25} text={title} />
        <SubTitle isEnable={isEnable} text={`${local} ${time}`} />
        <DayOfWeek isEnable={isEnable} selectedDay={dayOfWeek} />
      </View>
    </S.Container>
  );
}
