import React, { useState } from 'react';
import { ScheduleCardLeftInfo, ScheduleCardRightInfo } from 'components';
import * as S from './style';

export function ScheduleCard() {
  const [isEnable, setIsEnable] = useState<boolean>(true);
  const onTogglePress = () => setIsEnable(state => !state);

  return (
    <S.Container>
      <S.Wrapper>
        <ScheduleCardLeftInfo isEnable={isEnable} />
        <ScheduleCardRightInfo
          isEnable={isEnable}
          onTogglePress={onTogglePress}
        />
      </S.Wrapper>
    </S.Container>
  );
}
