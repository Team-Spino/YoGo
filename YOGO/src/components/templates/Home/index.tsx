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
      const weekList = makeWeekList(week)
      makeMarkedDates([...dateList, ...weekList]);
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
  }

  const makeWeekList = (week : object) => {
    const weekLiteral = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = dayjs(selectedDay).format('ddd');
    const oneDay = 86400
    let weekList = []
    for (const [key, value] of Object.entries(week)) {
      let diff = weekLiteral.indexOf(key) - weekLiteral.indexOf(today)
      let diffTimeStamp = diff * oneDay
      let date = dayjs(selectedDay).add(diffTimeStamp, 'second').format('YYYY-MM-DD')
    for(let i = 0; i < 360; i+=7){
      weekList.push(dayjs(date).add(oneDay * i, 'second').format('YYYY-MM-DD'))
      }
    }
    return weekList
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
