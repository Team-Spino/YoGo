import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { FloatingButton, AgendaBox } from 'components';
import { DUMMY_DATA } from 'utils';
import { IconPlus } from 'assets';
import { RootStackParamList } from 'types';
import * as S from './style';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function Home({ navigation }: { navigation: Prop }) {

  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));

  const [data , setDate] = useState(DUMMY_DATA);

  const [markedDates , setMarkedDate] = useState({});

  const onPress = () => {
    navigation.push('HandleSchedule', { title: 'Add' });
  };

  const onDayPress = (day : string) => {
    setSelectedDay(day);
   
  };

  useEffect(() => {
    setDate(DUMMY_DATA.filter(({cur}) => cur.day === selectedDay));
    let markedDates = {};
    DUMMY_DATA.forEach(({cur}) => { markedDates = {
      ...markedDates,
      ...{ [cur.day]: { marked: true } },
    }})
    setMarkedDate(markedDates);
  }, [selectedDay]);

  return (
    <S.Container>
      <AgendaBox data={data} selectedDay={selectedDay} onDayPress={onDayPress} markedDates = {markedDates}/>
        <FloatingButton onPress={onPress}>
          <IconPlus />
        </FloatingButton>
    </S.Container>
  );
}
