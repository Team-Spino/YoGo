import React from 'react';
import uuid from 'react-native-uuid';
import { ScheduleCard, FloatingButton } from 'components';
import { DUMMY_DATA } from 'utils';
import { IconPlus } from 'assets';
import * as S from './style';

export function Home({ navigation }: { navigation: any }) {
  const onPress = () => navigation.navigate('HandleSchedule');

  return (
    <S.Container>
      <S.Wrapper>
        <S.Inner>
          {DUMMY_DATA.map(data => (
            <ScheduleCard key={uuid.v4()} data={data} />
          ))}
        </S.Inner>

        <FloatingButton onPress={onPress}>
          <IconPlus />
        </FloatingButton>
      </S.Wrapper>
    </S.Container>
  );
}
