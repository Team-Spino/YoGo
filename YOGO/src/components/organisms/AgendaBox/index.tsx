import React from 'react';
import { Agenda } from 'react-native-calendars';
import { Text, View } from 'react-native';
import { SwipeContent } from 'components';
import { IScheduleProps } from 'types';

interface IAgendaProps {
  schedules: Array<IScheduleProps>;
  selectedDay: string;
  markedDates: object;
  onDayPress: (day: string) => void;
}

export function AgendaBox({
  schedules,
  selectedDay,
  markedDates,
  onDayPress,
}: IAgendaProps) {

  return (
    <Agenda
      items={{
        [schedules.length && selectedDay]: [{ schedules }],
      }}
      // 아직 사용하지 않음
      loadItemsForMonth={ month => {
        console.log('trigger items loading');
      }}
      onDayPress={day => {
        onDayPress(day.dateString);
      }}
      // 임시용
      renderEmptyData={() => {
        return (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>This is empty date!</Text>
          </View>
        );
      }}
      // 날짜 가리기
      renderDay={(day, item) => {
        return <View style={{ display: 'none' }} />;
      }}
      renderItem={({schedules})=>{
        return <SwipeContent data = {schedules} />
      }}
      selected={selectedDay}
      markedDates={{ ...markedDates }}
      // 임시용
      onRefresh={() => console.log('refreshing...')}
      showClosingKnob={true}
      theme={{
        dotColor: '#6564CC',
        selectedDotColor: '#6564CC',
        selectedDayBackgroundColor: '#6564CC',
        todayTextColor: '#6564CC',
      }}
    />
  );
}