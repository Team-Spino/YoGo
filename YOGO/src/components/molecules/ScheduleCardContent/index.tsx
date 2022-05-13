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
  const { CUR_CITY } = cur;
  return (
    <S.Container>
      <SubTitle isEnable={isEnable} text={`${TARGET_CITY} ${TARGET_TIME}`} />
      <S.Wrapper>
        <Title isEnable={isEnable} text={CUR_CITY} size={20} />
        <ToggleBtn isEnable={isEnable} onTogglePress={onTogglePress} />
      </S.Wrapper>
    </S.Container>
  );
}
