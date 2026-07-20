import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { View, useTheme } from '@tamagui/core';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { RenderEmptyData, SwipeContent, TagFilterContainer } from 'components';
import { IScheduleProps, ITagFilter } from 'types';
import { TAG_FILTER_COLOR } from 'utils';
import dayjs from 'dayjs';

const windowHeight = Dimensions.get('window').height;

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
  const [isExpand, setIsExpand] = useState<boolean>(false);
  // react-native-calendars의 theme prop은 RN 객체라 토큰 문자열을 못 받으므로
  // useTheme으로 실제 값을 읽어 넣습니다.
  const theme = useTheme();

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
  }, [selectedTag,schedules]);

  return (
    <CalendarProvider
        date={selectedDay}
        onMonthChange={date => onDayPress(date.dateString)}
        disabledOpacity={0.6}
      >
        <ExpandableCalendar
          hideArrows
          style={{
            top: '0%',
          }}
          onCalendarToggled={(isOpen) => {
            setIsExpand(isOpen);
          }}
          minDate={dayjs().format('YYYY-MM-DD')}
          pastScrollRange={1}
          futureScrollRange={12}
          theme={{
            calendarBackground: theme.background.val,
            backgroundColor: theme.background.val,
            dayTextColor: theme.color.val,
            monthTextColor: theme.color.val,
            textSectionTitleColor: theme.colorSubtle.val,
            textDisabledColor: theme.colorMuted.val,
            dotColor: theme.accent.val,
            selectedDotColor: theme.onAccent.val,
            selectedDayBackgroundColor: theme.accent.val,
            selectedDayTextColor: theme.onAccent.val,
            todayTextColor: theme.accent.val,
          }}
          onDayPress={day =>  onDayPress(day.dateString)}
          firstDay={1}
          markedDates={{...markedDates}}
        />
        <View top={-(windowHeight * 0.06)} width="100%" height={windowHeight * 0.68}>
        <TagFilterContainer tags={selectedTag} onTagPress={onTagPress} />
        {schedules.length === 0 && (
          <RenderEmptyData text={'No Schedule'} />
        )}
        {schedules.length > 0 && (
              <SwipeContent
                data={filteredSchedule}
                onDeleteTarget={onDeleteTarget}
                onEditTarget={onEditTarget}
              />
        )}
        </View>
      </CalendarProvider>
  );
}
