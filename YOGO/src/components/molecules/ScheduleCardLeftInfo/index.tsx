import React from 'react';
import { View } from 'react-native';
import { Tag, Title, SubTitle, DayOfWeek } from 'components';
import * as S from './style';

export function ScheduleCardLeftInfo({ isEnable }: { isEnable: boolean }) {
  return (
    <S.Container>
      <Tag color={'#91FC88'} />
      <View>
        <Title isEnable={isEnable} size={30} text={'hello'} />
        <SubTitle isEnable={isEnable} text={'hello'} />
        <DayOfWeek isEnable={isEnable} selectedDay={['월', '수', '금', '토']} />
      </View>
    </S.Container>
  );
}
