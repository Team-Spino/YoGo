import React, { useState } from 'react';
import {
  ScheduleCardLeftInfo,
  ScheduleCardRightInfo,
  DetailModal,
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

  const leftCardData = { title, tagColor, target, dayOfWeek };
  const rightCardData = { cur };

  return (
    <>
      <S.Container onPress={onShowDetailPress}>
        <S.Wrapper>
          <ScheduleCardLeftInfo isEnable={isEnable} data={leftCardData} />
          <ScheduleCardRightInfo
            isEnable={isEnable}
            onTogglePress={onTogglePress}
            data={rightCardData}
          />
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
