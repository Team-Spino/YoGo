import React from 'react';
import { View } from 'react-native';
import { Tag, Title, SubTitle, DayOfWeek } from 'components';
import { ITarget } from 'types';
import * as S from './style';

interface IScheduleCardHeaderProps {
  isEnable: boolean;
  data: {
    title: string;
    tagColor: string;
  };
}

export function ScheduleCardHeader({
  isEnable,
  data,
}: IScheduleCardHeaderProps) {
  const { title, tagColor } = data;
  return (
    <S.Container>
      <Tag color={tagColor} />
      <Title isEnable={isEnable} size={23} text={title} />
    </S.Container>
  );
}
