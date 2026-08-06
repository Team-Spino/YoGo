import React, { useState, useEffect } from 'react';
import { View } from '@tamagui/core';
import {
  CalendarStrip,
  RenderEmptyData,
  SwipeContent,
  TagFilterContainer,
} from 'components';
import { IScheduleProps, ITagFilter } from 'types';
import { TAG_FILTER_COLOR } from 'utils';

interface IAgendaProps {
  schedules: Array<IScheduleProps>;
  selectedDay: string;
  markedDates: Record<string, unknown>;
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
    <View flex={1}>
      <CalendarStrip
        selectedDay={selectedDay}
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
      {schedules.length === 0 ? (
        <RenderEmptyData text={'No schedules'} />
      ) : (
        <>
          <TagFilterContainer tags={selectedTag} onTagPress={onTagPress} />
          <SwipeContent
            data={filteredSchedule}
            onDeleteTarget={onDeleteTarget}
            onEditTarget={onEditTarget}
          />
        </>
      )}
    </View>
  );
}
