import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Title, SubTitle, DayOfWeek, Tag } from 'components';
import * as S from './style';

export function ScheduleCard() {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Inner>
          <View>
            <Tag color={'#91FC88'} />
          </View>
          <View>
            <Title size={30} text={'hello'} />
            <SubTitle text={'hello'} />
            <DayOfWeek selectedDay={['월', '수', '금', '토']} />
          </View>
        </S.Inner>
        <S.Inner>
          <View>
            <Text>Hello</Text>
            <Switch />
          </View>
        </S.Inner>
      </S.Wrapper>
    </S.Container>
  );
}
