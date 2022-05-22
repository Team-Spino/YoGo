import React from 'react';
import { Title, DayOfWeekBtn } from 'components';
import { IDayOfWeekProps } from 'types';
import * as S from './style';

interface ITagSelectContainerProps {
  dayOfWeek: Array<IDayOfWeekProps>;
  onDaySelect: (key: string) => void;
}

export function DayOfWeekContainer({
  dayOfWeek,
  onDaySelect,
}: ITagSelectContainerProps) {
  return (
    <S.Container>
      <Title isEnable={true} text={'Select a Day of the week'} size={15} />
      <S.Wrapper>
        {dayOfWeek.map((day: IDayOfWeekProps) => (
          <DayOfWeekBtn key={day.key} day={day} onDaySelect={onDaySelect} />
        ))}
      </S.Wrapper>
    </S.Container>
  );
}
