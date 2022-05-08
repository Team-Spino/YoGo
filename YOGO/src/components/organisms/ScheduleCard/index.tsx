import React, { useState } from 'react';
import {
  ScheduleCardHeader,
  ScheduleCardContent,
  DetailModal,
  DayOfWeek,
} from 'components';
import { ITimeData } from 'types';
import * as S from './style';

export function ScheduleCard({ data }: { data: ITimeData }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEnable, setIsEnable] = useState<boolean>(true);

  const onTogglePress = () => setIsEnable(state => !state);
  const onShowDetailPress = () => setIsVisible(true);
  const onCloseDetailPress = () => setIsVisible(false);

  const { title, tagColor, target, cur, dayOfWeek } = data;

  const headData = { title, tagColor };
  const contentData = { target, cur };

  return (
    <>
      <S.Container onPress={onShowDetailPress}>
        <S.Wrapper>
          <ScheduleCardHeader isEnable={isEnable} data={headData} />
          <ScheduleCardContent
            isEnable={isEnable}
            onTogglePress={onTogglePress}
            data={contentData}
          />
          <DayOfWeek isEnable={isEnable} selectedDay={dayOfWeek} />
        </S.Wrapper>
      </S.Container>
      <DetailModal
        isVisible={isVisible}
        onCloseDetailPress={onCloseDetailPress}
        data={data}
      />
    </>
  );
}
