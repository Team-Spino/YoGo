import React from 'react';
import { Tag, CardTitle } from 'components';
import * as S from './style';

interface IScheduleCardHeaderProps {
  isEnable: boolean;
  title: string;
  tagColor: string;
}

export function ScheduleCardHeader({
  isEnable,
  title,
  tagColor,
}: IScheduleCardHeaderProps) {
  return (
    <S.Container>
      <Tag color={tagColor} />
      <CardTitle isEnable={isEnable} size={23} text={title} />
    </S.Container>
  );
}
