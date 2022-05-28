import React, { useState, useEffect } from 'react';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { RenderEmptyData, SwipeContent, TagFilterContainer } from 'components';
import { IScheduleProps, ITagFilter } from 'types';
import { TAG_FILTER_COLOR } from 'utils';
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
  const [isExpand, setIsExpand] = useState<boolean>(false);

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
            position: 'absolute',
            top: isExpand ? '0%' : '-5%',
          }}
          onCalendarToggled={(isOpen) => {
            setIsExpand(isOpen);
          }}
          minDate={dayjs().format('YYYY-MM-DD')}
          pastScrollRange={1}
          futureScrollRange={12}
          showClosingKnob={true}
          theme={{
            dotColor: '#6564CC',
            selectedDotColor: '#ffffff',
            selectedDayBackgroundColor: '#6564CC',
            todayTextColor: '#6564CC',
          }}
          onDayPress={day =>  onDayPress(day.dateString)}
          firstDay={1}
          markedDates={{...markedDates}}
        />
        <S.Content>
        <TagFilterContainer tags={selectedTag} onTagPress={onTagPress} />
        {schedules.length === 0 && (
          <RenderEmptyData text={'No Schedule'} />
        )}
        {schedules.length > 0 && (
              <SwipeContent
                data={filteredSchedule}
                onDeleteTarget={onDeleteTarget}
                onEditTarget={onEditTarget}
                selectedDay={selectedDay}
              />
        )}
        </S.Content>
      </CalendarProvider>
  );
}
