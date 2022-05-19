import React, { useEffect, useState, useContext } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { FloatingButton, AgendaBox } from 'components';
import { DUMMY_DATA } from 'utils';
import { IconPlus } from 'assets';
import { RootStackParamList, IScheduleProps } from 'types';
import {
  connectDB,
  createScheduleTable,
  deleteScheduleItem,
  dropScheduleTable,
  getDateAndDayOfWeek,
  getScheduleItems,
} from 'db';

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
  };

  const initDB = async () => {
    try {
      const db = await connectDB();
      await createScheduleTable(db);
      const dayOfWeek = new Date(selectedDay).toLocaleDateString('en', {
        weekday: 'short',
      });

      const items = await getScheduleItems(db, dayOfWeek, selectedDay);

      const dateAndDayOfWeek = await getDateAndDayOfWeek(db)
      const {dateList, week} = dividDateAndDayOfWeek(dateAndDayOfWeek)
      console.log('성공!', dateList, week)
      makeMarkedDates(dateList);
      setSchedules(items);
    } catch (e) {
      console.error(e);
    }
  };

  const dividDateAndDayOfWeek = (dateAndDayOfWeek : any) => {
    const checkYYMMDD = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
    const removeSpecial= /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
    const dateList: string[] = []
    const dayOfWeekList: string[] = []

    dateAndDayOfWeek.forEach((item: any) => {
      const isDate = checkYYMMDD.exec(item.result);
      if(isDate){
        return dateList.push(item.result)
      }
      return item.result.replace(removeSpecial,'').split(',').map((el: any) => dayOfWeekList.push(el))
    })
    const week = countDayOfWeek(dayOfWeekList)
    return { dateList, week }
  }

  const countDayOfWeek = (dayOfWeekList : any) => {
    return dayOfWeekList.reduce((accu, curr) => { 
      accu[curr] = (accu[curr] || 0)+1; 
      return accu;
    }, {});
  }

  const makeMarkedDates = (dateList : any) => {
    let markedDates = {};
    dateList.forEach((day) => {
      markedDates = {
        ...markedDates,
        ...{ [day]: { marked: true } },
      };
    });
    setMarkedDate(markedDates);
    console.log(markedDates)
  }

  useEffect(() => {
    initDB();

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
