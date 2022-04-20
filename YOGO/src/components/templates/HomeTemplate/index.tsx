import React from 'react';
import uuid from 'react-native-uuid';
import { ScheduleCard, FloatingButton } from 'components';
import { IconPlus } from 'assets';
import { ITimeData } from 'types';
import * as S from './style';

export function HomeTemplate({ DUMMY_DATA }: { DUMMY_DATA: Array<ITimeData> }) {
  const onPress = () => console.log('hello');

  return (
    <>
      <S.Container>
        {DUMMY_DATA.map(data => (
          <ScheduleCard key={uuid.v4()} data={data} />
        ))}
      </S.Container>

      <FloatingButton onPress={onPress}>
        <IconPlus />
      </FloatingButton>
    </>
  );
}
