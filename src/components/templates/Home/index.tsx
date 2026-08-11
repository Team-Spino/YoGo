import React from 'react';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FloatingButton, AgendaBox } from 'components';
import { IconPlus } from 'assets';
import { RootStackParamList, IScheduleProps } from 'types';
import { useSchedules } from 'hooks';
import { useSelectedDay } from 'context';
import { View, useTheme } from '@tamagui/core';
import { Screen, Display, Eyebrow } from 'styles/ui';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function Home({ navigation }: { navigation: Prop }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { selectedDay, setSelectedDay } = useSelectedDay();

  const { schedules, markedDates, removeSchedule } = useSchedules(selectedDay);

  const onAddPress = () => {
    navigation.push('HandleSchedule', { title: 'Add', item: {} });
  };

  const onEditTarget = (item: IScheduleProps) => {
    navigation.push('HandleSchedule', { title: 'Edit', item });
  };

  return (
    <Screen>
      <View
        paddingHorizontal={20}
        paddingTop={insets.top + 14}
        paddingBottom={8}
      >
        <Display>Schedules</Display>
        <Eyebrow marginTop={8}>{dayjs(selectedDay).format('dddd, MMMM D')}</Eyebrow>
      </View>
      <AgendaBox
        schedules={schedules}
        selectedDay={selectedDay}
        onDayPress={setSelectedDay}
        markedDates={markedDates}
        onDeleteTarget={removeSchedule}
        onEditTarget={onEditTarget}
      />
      <FloatingButton onPress={onAddPress}>
        <IconPlus color={theme.onInk.val} />
      </FloatingButton>
    </Screen>
  );
}
