import React from 'react';
import { Title, ToggleBtn, SubTitle } from 'components';
import { ITargetProps, ICurProps } from 'types';
import * as S from './style';

interface IScheduleCardContentProps {
  isEnable: boolean;
  onTogglePress: () => void;
  target: ITargetProps;
  cur: ICurProps;
}

export function ScheduleCardContent({
  isEnable,
  onTogglePress,
  target,
  cur,
}: IScheduleCardContentProps) {
  const { TARGET_TIME, TARGET_CITY, TARGET_DAY } = target;
  const { CUR_DAY, CUR_TIME } = cur;

  const [, time, meridiem] = new Date(`${CUR_DAY} ${CUR_TIME}`)
    .toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .split(' ');
  return (
    <S.Container>
      <SubTitle isEnable={isEnable} text={`${TARGET_CITY} ${TARGET_TIME}`} />
      <S.Wrapper>
        <Title isEnable={isEnable} text={`${time} ${meridiem}`} size={20} />
        <ToggleBtn isEnable={isEnable} onTogglePress={onTogglePress} />
      </S.Wrapper>
    </S.Container>
  );
}
