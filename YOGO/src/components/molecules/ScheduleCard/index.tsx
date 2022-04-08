import React from 'react';
import uuid from 'react-native-uuid';
import { View, Text } from 'react-native';
import { Title, SubTitle, DayOfWeek } from 'components';
import * as S from './style';

export function ScheduleCard() {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Inner>
          <View>
            <Text>good</Text>
          </View>
          <View>
            <Title text={'hello'} />
            <SubTitle text={'hello'} />
            <DayOfWeek selectedDay={['월', '수', '금', '토']} />
          </View>
        </S.Inner>
        <S.Inner>
          <View>
            <Text>good</Text>
          </View>
          <View>
            <Title text={'hello'} />
            <SubTitle text={'hello'} />
            <DayOfWeek selectedDay={['월', '수', '금', '토']} />
          </View>
        </S.Inner>
      </S.Wrapper>
    </S.Container>
  );
}
