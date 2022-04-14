import React from 'react';
import { View } from 'react-native';
import { Tag, Title, SubTitle, DayOfWeek } from 'components';
import * as S from './style';

export function ScheduleCardLeftInfo({ isEnable }: { isEnable: boolean }) {
  return (
    <S.Container>
      <Tag color={'#91FC88'} margin={5} />
      <View>
        <Title isEnable={isEnable} size={25} text={'팀 스피노 회의'} />
        <SubTitle isEnable={isEnable} text={'London 9:00pm'} />
        <DayOfWeek isEnable={isEnable} selectedDay={['Sun', 'Tue', 'Wed']} />
      </View>
    </S.Container>
  );
}
