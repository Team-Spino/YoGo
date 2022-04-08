import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Title } from 'components';
import * as S from './style';

export function ScheduleCard() {
  const onPress = () => console.log('sd');
  return (
    <S.Container>
      <S.Wrapper>
        <Title text={'hello'} />
      </S.Wrapper>
    </S.Container>
  );
}
