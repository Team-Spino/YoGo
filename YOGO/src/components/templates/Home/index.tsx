import React, { useEffect, useState, useCallback } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { FloatingButton, AgendaBox } from 'components';
import { DUMMY_DATA } from 'utils';
import { IconPlus } from 'assets';
import { RootStackParamList } from 'types';
import {
  connectDB,
  createScheduleTable,
  getScheduleItems,
  insertScheduleItem,
  deleteScheduleItem,
} from 'db';
import * as S from './style';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function Home({ navigation }: { navigation: Prop }) {
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));

  const [data, setData] = useState([]);

  const [markedDates, setMarkedDate] = useState({});

  const onPress = () => {
    navigation.push('HandleSchedule', { title: 'Add' });
  };

  const onDayPress = (day: string) => {
    setSelectedDay(day);
  };

  const initDB = useCallback(async () => {
    try {
      const db = await connectDB();
      await createScheduleTable(db);

      // const items = await getScheduleItems(db);

      // setData(items);
      // setMarkedDates(items.reduce((acc, cur) => {
      //   acc[cur.date] = { selected: true };
      //   return acc;
      // }, {}));
    } catch (e) {
      console.error(e);
    }
  }, []);

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
  }, [selectedDay]);

  return (
    <S.Container>
      <AgendaBox
        data={data}
        selectedDay={selectedDay}
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
      <FloatingButton onPress={onPress}>
        <IconPlus color="#fff" />
      </FloatingButton>
    </S.Container>
  );
}
