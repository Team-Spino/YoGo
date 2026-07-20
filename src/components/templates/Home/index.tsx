import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { FloatingButton, AgendaBox } from 'components';
import { IconPlus } from 'assets';
import { RootStackParamList, IScheduleProps } from 'types';
import { useSchedules } from 'hooks';
import * as S from './style';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function Home({ navigation }: { navigation: Prop }) {
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));

  const { schedules, markedDates, removeSchedule } = useSchedules(selectedDay);

  const onAddPress = () => {
    navigation.push('HandleSchedule', { title: 'Add', item: {} });
  };

  const onEditTarget = (item: IScheduleProps) => {
    navigation.push('HandleSchedule', { title: 'Edit', item });
  };

  return (
    <S.Container>
      <AgendaBox
        schedules={schedules}
        selectedDay={selectedDay}
        onDayPress={setSelectedDay}
        markedDates={markedDates}
        onDeleteTarget={removeSchedule}
        onEditTarget={onEditTarget}
      />
      <FloatingButton onPress={onAddPress}>
        <IconPlus color="#fff" />
      </FloatingButton>
    </S.Container>
  );
}
