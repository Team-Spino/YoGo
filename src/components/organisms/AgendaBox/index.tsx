import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { RenderEmptyData, SwipeContent, TagFilterContainer } from 'components';
import { IScheduleProps, ITagFilter } from 'types';
import { ONE_DAY, TAG_FILTER_COLOR } from 'utils';
import * as S from './style';
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
  onEditTarget,
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
          <>
          <TagFilterContainer tags={selectedTag} onTagPress={onTagPress} />
          <RenderEmptyData text={'No Schedule'} />
          </>
        );
      }}
      // 날짜 가리기
      renderDay={() => {
        return <View style={{ display: 'none' }} />;
      }}
      renderItem={() => {
        return (
          <View style={style.container}>
            <TagFilterContainer tags={selectedTag} onTagPress={onTagPress} />
            <S.Wrapper>
              <SwipeContent
                data={filteredSchedule}
                onDeleteTarget={onDeleteTarget}
                onEditTarget={onEditTarget}
                selectedDay={selectedDay}
              />
            </S.Wrapper>
          </View>
        );
      }}
      minDate={dayjs().format('YYYY-MM-DD')}
      selected={selectedDay}
      pastScrollRange={1}
      futureScrollRange={12}
      markedDates={{ ...markedDates }}
      refreshing={false}
      showClosingKnob={true}
      theme={{
        dotColor: '#6564CC',
        selectedDotColor: '#ffffff',
        selectedDayBackgroundColor: '#6564CC',
        todayTextColor: '#6564CC',
      }}
    />
  );
}
const style = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height * 0.68,
  },
});