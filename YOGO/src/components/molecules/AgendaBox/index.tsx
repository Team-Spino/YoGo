import React from 'react';
import uuid from 'react-native-uuid';
import { Agenda } from 'react-native-calendars';
import { Text, View } from 'react-native';
import { ScheduleCard } from 'components';
import * as S from './style';


interface IAgendaProps {
    data : []
    selectedDay : string
    markedDates : object
    onDayPress : (day: string) => void
}

export function AgendaBox({ data , selectedDay, markedDates ,onDayPress }: IAgendaProps) {
  return (
    <Agenda
      items={{
        [data.length && selectedDay] : [{ data }]}}
      // 아직 사용하지 않음
      // loadItemsForMonth={ month => {
      //   console.log('trigger items loading');
      // }}
      onDayPress={day => {
        onDayPress(day.dateString);
      }}

      // 임시용
      renderEmptyData={() => {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This is empty date!</Text>
          </View>
        );
      }}

      // 날짜 가리기
      renderDay={(day, item) => {
        return (
          <View style={{display : 'none'}} />
        );
      }}

      renderItem = { ( {data} ,  firstItemInDay )  =>  (
        <S.Inner>
          {data.map((data : any) => (
            <ScheduleCard key={uuid.v4()} data={data} />
          ))}
        </S.Inner>
      )} 
      selected={selectedDay}
      markedDates={{...markedDates}}

      // 임시용
      onRefresh={() => console.log('refreshing...')}
      showClosingKnob = { true }
      theme={{
        dotColor: '#6564CC',
        selectedDotColor : '#6564CC',
        selectedDayBackgroundColor : '#6564CC',
        todayTextColor : '#6564CC',
    
      }}
    />
  );
}