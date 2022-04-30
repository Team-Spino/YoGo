import React from 'react';
import { Title, ToggleBtn, SubTitle } from 'components';
import { ITarget, ICur } from 'types';
import * as S from './style';

interface IScheduleCardContentProps {
  isEnable: boolean;
  onTogglePress: () => void;
  data: {
    target: ITarget;
    cur: ICur;
  };
}

export function ScheduleCardContent({
  isEnable,
  onTogglePress,
  data,
}: IScheduleCardContentProps) {
  const { target, cur } = data;

  return (
    <S.Container>
      <SubTitle isEnable={isEnable} text={`${target.local} ${target.time}`} />
      <S.Wrapper>
        <Title isEnable={isEnable} text={cur.time} size={20} />
        <ToggleBtn isEnable={isEnable} onTogglePress={onTogglePress} />
      </S.Wrapper>
    </S.Container>
  );
}
