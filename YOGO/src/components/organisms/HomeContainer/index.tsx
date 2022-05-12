import React from 'react';
import uuid from 'react-native-uuid';
import { ScheduleCard, FloatingButton } from 'components';
import { IconPlus } from 'assets';
import { ITimeData } from 'types';
import * as S from './style';

export function HomeTemplate({
  DUMMY_DATA,
  navigation,
}: {
  DUMMY_DATA: Array<ITimeData>;
  navigation: any;
}) {
  const onPress = () => navigation.navigate('Search');

  return (
    <>
      <S.Container>
        {DUMMY_DATA.map(data => (
          <ScheduleCard key={uuid.v4()} data={data} />
        ))}
      </S.Container>

      <FloatingButton onPress={onPress}>
        <IconPlus color="#231F20" />
      </FloatingButton>
    </>
  );
}
