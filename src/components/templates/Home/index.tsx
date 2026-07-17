import React, { useEffect, useState, useContext, useCallback } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { Platform } from 'react-native';
import { FloatingButton, AgendaBox } from 'components';
import { IconPlus } from 'assets';
import { RootStackParamList, IScheduleProps } from 'types';
import {
  findScheduleDays,
  findSchedulesByDay,
  initScheduleTable,
  removeSchedule,
} from 'db';
import { useNotification } from 'hooks';
import {
  getDatesForWeekdays,
  parseToSlash,
  splitScheduleDays,
} from 'utils';
import { PopContext } from 'context';
import * as S from './style';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function Home({ navigation }: { navigation: Prop }) {
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));

  const [schedules, setSchedules] = useState<Array<IScheduleProps>>([]);

  const [markedDates, setMarkedDate] = useState({});

  const { isPoped, setPop } = useContext(PopContext);

  const { deleteAllNotification } = useNotification();

  const onPress = () => {
    navigation.push('HandleSchedule', { title: 'Add', item: {} });
  };

  const onDayPress = (day: string) => {
    setSelectedDay(day);
  };

  const onEditTarget = async (item: IScheduleProps) => {
    navigation.push('HandleSchedule', { title: 'Edit', item });
    markedDB();
  };

  const onDeleteTarget = async (id: number) => {
    setSchedules(schedules.filter(item => item.key !== id));

    await removeSchedule(id);

    if (Platform.OS === 'ios') {
      deleteAllNotification({ number: id });
    }
    
    markedDB();
  };

  const initDB = async () => {
    try {
      await initScheduleTable();

      const dayOfWeek = new Date(parseToSlash(selectedDay)).toLocaleDateString(
        'en',
        {
          weekday: 'short',
        },
      );

      const items = await findSchedulesByDay(dayOfWeek, selectedDay);
      setSchedules(items);
    } catch (e) {
      console.error(e);
    }
  };

  const markedDB = async () => {
    const scheduleDays = await findScheduleDays();
    const { dates, weekdays } = splitScheduleDays(scheduleDays);

    makeMarkedDates([...dates, ...getDatesForWeekdays(weekdays)]);
  };

  const makeMarkedDates = useCallback((dateList: string[]) => {
    let markedDates = {};
    dateList.forEach((day: string) => {
      markedDates = {
        ...markedDates,
        ...{ [day]: { marked: true } },
      };
    });
    setMarkedDate(markedDates);
  }, []);

  useEffect(() => {
    initDB();
    markedDB();
    setPop(false);
  }, [selectedDay, setSelectedDay, isPoped, setPop]);

  return (
    <S.Container>
      <AgendaBox
        schedules={schedules}
        selectedDay={selectedDay}
        onDayPress={onDayPress}
        markedDates={markedDates}
        onDeleteTarget={onDeleteTarget}
        onEditTarget={onEditTarget}
      />
      <FloatingButton onPress={onPress}>
        <IconPlus color="#fff" />
      </FloatingButton>
    </S.Container>
  );
}
