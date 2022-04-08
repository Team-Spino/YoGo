import React from 'react';
import { View, Text, Switch } from 'react-native';
import { ScheduleCardLeftInfo } from 'components';
import * as S from './style';

export function ScheduleCard() {
  return (
    <S.Container>
      <S.Wrapper>
        <ScheduleCardLeftInfo />
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
