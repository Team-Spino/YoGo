import React from 'react';
import { Title, ToggleBtn, SubTitle } from 'components';
import { ITargetProps, ICurProps } from 'types';
import { parseCity, formatCityName, toFormat12Hour } from 'utils';
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

  return (
    <S.Container>
      <SubTitle
        isEnable={isEnable}
        text={`${formatCityName(
          parseCity({
            city: TARGET_CITY,
          }),
        )} ${toFormat12Hour({
          day: TARGET_DAY,
          time: TARGET_TIME,
        })}`}
      />
      <S.Wrapper>
        <Title
          isEnable={isEnable}
          text={toFormat12Hour({
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
