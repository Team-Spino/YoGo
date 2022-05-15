import React from 'react';
import uuid from 'react-native-uuid';
import { Agenda } from 'react-native-calendars';
import { StyleSheet, Text, View } from 'react-native';
import { ScheduleCard } from 'components';
import { IScheduleProps } from 'types';
import * as S from './style';
import { SwipeRow } from 'react-native-swipe-list-view';

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
  // const data = [{ key: '0' }, { key: '1' }, { key: '2' }, { key: '3' }];

  const renderItem = ({ schedules }, firstItemInDay) => {
    return (
      
    <S.Inner>
    {schedules.map((schedule: IScheduleProps, idx : number) => (
        // 
          <SwipeRow
                // disableRightSwipe
                key={uuid.v4()}
                rightOpenValue={-75}
              >
                <View style={styles.standaloneRowBack}>
                  <Text style={styles.backTextWhite}>Right</Text>
                </View>
                 <ScheduleCard key={uuid.v4()} schedule={schedule} />
              </SwipeRow>
    ))}
    </S.Inner>
    )
  }
  
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
      renderItem={renderItem}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  backTextWhite: {
    color: '#FFF',
  },
  spacer: {
    height: 50,
  },
});