import React from 'react';
import { View } from 'react-native';
import { Tag, Title, SubTitle, DayOfWeek } from 'components';
import * as S from './style';

export function ScheduleCardLeftInfo() {
  return (
    <S.Container>
      <View>
        <Tag color={'#91FC88'} />
      </View>
      <View>
        <Title size={30} text={'hello'} />
        <SubTitle text={'hello'} />
        <DayOfWeek selectedDay={['월', '수', '금', '토']} />
      </View>
    </S.Container>
  );
}
