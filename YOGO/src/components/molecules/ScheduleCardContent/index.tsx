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

const toFormat12hour = ({ day, time }: { day: string; time: string }) => {
  const [, hm, meridiem] = new Date(`${day} ${time}`)
    .toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .split(' ');
  return `${hm} ${meridiem}`;
};

export function ScheduleCardContent({
  isEnable,
  onTogglePress,
  target,
  cur,
}: IScheduleCardContentProps) {
  const { TARGET_TIME, TARGET_CITY, TARGET_DAY } = target;
  const { CUR_DAY, CUR_TIME } = cur;

  return (
    <S.Container>
      <SubTitle
        isEnable={isEnable}
        text={`${TARGET_CITY} ${toFormat12hour({
          day: TARGET_DAY,
          time: TARGET_TIME,
        })}`}
      />
      <S.Wrapper>
        <Title
          isEnable={isEnable}
          text={toFormat12hour({
            day: CUR_DAY,
            time: CUR_TIME,
          })}
          size={20}
        />
        <ToggleBtn isEnable={isEnable} onTogglePress={onTogglePress} />
      </S.Wrapper>
    </S.Container>
  );
}
