import React, { useEffect, useState, useContext } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { FloatingButton, AgendaBox } from 'components';
import { DUMMY_DATA } from 'utils';
import { IconPlus } from 'assets';
import { RootStackParamList, IScheduleProps } from 'types';
<<<<<<< HEAD
import {
  connectDB,
  createScheduleTable,
  getScheduleItems,
  dropScheduleTable,
} from 'db';
=======
import { connectDB, createScheduleTable, deleteScheduleItem, dropScheduleTable, getScheduleItems } from 'db';
>>>>>>> develop
import { PopContext } from 'context';
import * as S from './style';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function Home({ navigation }: { navigation: Prop }) {
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));

  const [schedules, setSchedules] = useState<Array<IScheduleProps>>([]);

  const [markedDates, setMarkedDate] = useState({});

  const { isPoped, setPop } = useContext(PopContext);

  const onPress = () => {
    navigation.push('HandleSchedule', { title: 'Add' });
  };

  const onDayPress = (day: string) => {
    setSelectedDay(day);
  };

  const onEditTarget = async (item: IScheduleProps) => {
    navigation.push('HandleSchedule', { title: 'Edit', item });
  };

  const onDeleteTarget = async (id: number) => {
    setSchedules(schedules.filter(item => item.key !== id));
    const db = await connectDB();
    await deleteScheduleItem(db, id);
  }


  const initDB = async () => {
    try {
      const db = await connectDB();
      await createScheduleTable(db);
      const dayOfWeek = new Date(selectedDay).toLocaleDateString('en', {
        weekday: 'short',
      });

      const items = await getScheduleItems(db, dayOfWeek, selectedDay);
      setSchedules(items);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    initDB();
    let markedDates = {};
    DUMMY_DATA.forEach(({ cur }) => {
      markedDates = {
        ...markedDates,
        ...{ [cur.day]: { marked: true } },
      };
    });

    setMarkedDate(markedDates);
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
