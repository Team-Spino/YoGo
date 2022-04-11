import React, { useState } from 'react';
import {
  ScheduleCardLeftInfo,
  ScheduleCardRightInfo,
  DetailModal,
} from 'components';
import * as S from './style';

export function ScheduleCard() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEnable, setIsEnable] = useState<boolean>(true);

  const onTogglePress = () => setIsEnable(state => !state);
  const onShowDetailPress = () => setIsVisible(true);
  const onCloseDetailPress = () => setIsVisible(false);

  return (
    <>
      <S.Container onPress={onShowDetailPress}>
        <S.Wrapper>
          <ScheduleCardLeftInfo isEnable={isEnable} />
          <ScheduleCardRightInfo
            isEnable={isEnable}
            onTogglePress={onTogglePress}
          />
        </S.Wrapper>
      </S.Container>
      <DetailModal
        isVisible={isVisible}
        onCloseDetailPress={onCloseDetailPress}
      />
    </>
  );
}
