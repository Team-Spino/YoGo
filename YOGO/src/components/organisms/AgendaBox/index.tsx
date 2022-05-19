import React, { useState, useEffect } from 'react';
import { Agenda } from 'react-native-calendars';
import { Text, View } from 'react-native';
import { SwipeContent, TagFilterContainer } from 'components';
import { IScheduleProps, ITagFilter } from 'types';
import { ONE_DAY, TAG_FILTER_COLOR } from 'utils';
import dayjs from 'dayjs';
interface IAgendaProps {
  schedules: Array<IScheduleProps>;
  selectedDay: string;
  markedDates: object;
  onDayPress: (day: string) => void;
  onDeleteTarget: (id: number) => Promise<void>;
  onEditTarget: (item: IScheduleProps) => void;
}

export function AgendaBox({
  schedules,
  selectedDay,
  markedDates,
  onDayPress,
  onDeleteTarget,
  onEditTarget
}: IAgendaProps) {
  const [selectedTag, setSelectedTag] =
    useState<Array<ITagFilter>>(TAG_FILTER_COLOR);

  const [filteredSchedule, setFilteredSchedule] = useState<
    Array<IScheduleProps>
  >([...schedules]);

  const onTagPress = (key: string) => {
    setSelectedTag(
      selectedTag.map(tag =>
        tag.key === key
          ? { ...tag, isSelected: !tag.isSelected }
          : { ...tag, isSelected: false },
      ),
    );
  };

  useEffect(() => {
    if (schedules.length === 0) return;

    const selTag = selectedTag.filter(tag => tag.isSelected).pop();
    setFilteredSchedule(
      selTag
        ? schedules.filter(schedule => schedule.TAG_COLOR === selTag.color)
        : schedules,
    );
  }, [selectedTag, schedules]);

  return (
    <Agenda
      items={{
        [schedules.length && selectedDay]: [{ schedules }],
      }}
      // 아직 사용하지 않음
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
        return (
        <>
        <TagFilterContainer tags={selectedTag} onTagPress={onTagPress} />
        <SwipeContent data= {filteredSchedule} onDeleteTarget={onDeleteTarget} onEditTarget ={onEditTarget} />
        </>
        )
      }}
      minDate={dayjs(selectedDay).add(-ONE_DAY, 'second').format('YYYY-MM-DD')}
      selected={selectedDay}
      pastScrollRange={1}
      futureScrollRange={12}
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
