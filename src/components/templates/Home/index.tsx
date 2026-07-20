import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FloatingButton, AgendaBox } from 'components';
import { IconPlus } from 'assets';
import { RootStackParamList, IScheduleProps } from 'types';
import { useSchedules } from 'hooks';
import { useSelectedDay } from 'context';
import { View } from '@tamagui/core';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function Home({ navigation }: { navigation: Prop }) {
  const { selectedDay, setSelectedDay } = useSelectedDay();

  const { schedules, markedDates, removeSchedule } = useSchedules(selectedDay);

  const onAddPress = () => {
    navigation.push('HandleSchedule', { title: 'Add', item: {} });
  };

  const onEditTarget = (item: IScheduleProps) => {
    navigation.push('HandleSchedule', { title: 'Edit', item });
  };

  return (
    <View width="100%" height="100%" backgroundColor="#fff">
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
    </View>
  );
}
