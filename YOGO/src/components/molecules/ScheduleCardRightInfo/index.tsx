import React from 'react';
import { Title, ToggleBtn } from 'components';
import { ICur } from 'types';
import * as S from './style';

interface IScheduleCardRightInfoProps {
  isEnable: boolean;
  onTogglePress: () => void;
  data: {
    cur: ICur;
  };
}

export function ScheduleCardRightInfo({
  isEnable,
  onTogglePress,
  data,
}: IScheduleCardRightInfoProps) {
  const { time } = data.cur;
  return (
    <S.Container>
      <Title isEnable={isEnable} text={time} size={20} />
      <ToggleBtn isEnable={isEnable} onTogglePress={onTogglePress} />
    </S.Container>
  );
}
