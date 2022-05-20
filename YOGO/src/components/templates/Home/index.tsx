import React, { useEffect, useState, useContext, useCallback } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { FloatingButton, AgendaBox } from 'components';
import { IconPlus } from 'assets';
import { RootStackParamList, IScheduleProps } from 'types';
import {
  connectDB,
  createScheduleTable,
  deleteScheduleItem,
  getDateAndDayOfWeek,
  getScheduleItems,
} from 'db';
import { ONE_DAY } from 'utils';
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
    markedDB();
  };

  const onDeleteTarget = async (id: number) => {
    setSchedules(schedules.filter(item => item.key !== id));
    
    const db = await connectDB();
    await deleteScheduleItem(db, id);
    markedDB();
  };

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
  
  const markedDB = async () => {
    const db = await connectDB();
    const dateAndDayOfWeek = await getDateAndDayOfWeek(db)
    const {dateList, rowWeek} = dividDateAndDayOfWeek(dateAndDayOfWeek)
    const weekList = makeWeekList(rowWeek)
    makeMarkedDates([...dateList, ...weekList]);
  }

  interface IDateAndDayOfWeek {
    result : string
  }

  const dividDateAndDayOfWeek = (dateAndDayOfWeek : IDateAndDayOfWeek[]) => {
    const checkYYMMDD = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
    const removeSpecial= /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
    const dateList: string[] = []
    const dayOfWeekList: string[] = []
    dateAndDayOfWeek.forEach((item: IDateAndDayOfWeek) => {
      const isDate = checkYYMMDD.exec(item.result);
      if(isDate){
        return dateList.push(item.result)
      }
      return item.result.replace(removeSpecial,'').split(',').map((el: string) => dayOfWeekList.push(el))
    })
    const rowWeek = countDayOfWeek(dayOfWeekList)
    return { dateList, rowWeek }
  }

  const countDayOfWeek = (dayOfWeekList : string[]) => {
    return dayOfWeekList.reduce((accu: any, curr: string) => { 
      accu[curr] = (accu[curr] || 0)+1; 
      return accu;
    }, {});
  }

  const makeWeekList = (rowWeek : object) => {
    const weekLiteral = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = dayjs().format('ddd');
    let weekList = []
    for (const [key, value] of Object.entries(rowWeek)) {
      let diff = weekLiteral.indexOf(key) - weekLiteral.indexOf(today)
      let diffTimeStamp = diff * ONE_DAY
      let date = dayjs().add(diffTimeStamp, 'second').format('YYYY-MM-DD')
    for(let i = 0; i < 360; i+=7){
      weekList.push(dayjs(date).add(ONE_DAY * i, 'second').format('YYYY-MM-DD'))
      }
    }
    return weekList
  }

  const makeMarkedDates = useCallback((dateList : string[]) => {
    let markedDates = {};
    dateList.forEach((day: string) => {
      markedDates = {
        ...markedDates,
        ...{ [day]: { marked: true } },
      };
    });
    setMarkedDate(markedDates);
  }, [])


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
