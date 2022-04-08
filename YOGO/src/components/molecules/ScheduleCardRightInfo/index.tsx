import React from 'react';
import { Title, ToggleBtn } from 'components';
import * as S from './style';

interface IScheduleCardRightInfoProps {
  isEnable: boolean;
  onTogglePress: () => void;
}

export function ScheduleCardRightInfo({
  isEnable,
  onTogglePress,
}: IScheduleCardRightInfoProps) {
  return (
    <S.Container>
      <Title isEnable={isEnable} text={'9 : 00 pm'} size={20} />
      <ToggleBtn isEnable={isEnable} onTogglePress={onTogglePress} />
    </S.Container>
  );
}
