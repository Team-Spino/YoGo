import React from 'react';
import { View } from 'react-native';
import dayjs from 'dayjs';
import { Calendar, DateData } from 'react-native-calendars';
import { Text, useTheme } from '@tamagui/core';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface IDatePickerProps {
  date: Date;
  onChangeDate: (event: DateTimePickerEvent, date: Date | undefined) => void;
}

// onChangeDate는 기존 네이티브 피커 시그니처를 유지합니다(소비처 변경 없음).
const NOOP_EVENT = {} as DateTimePickerEvent;

/**
 * 바텀시트/일정 폼의 날짜·시간 선택.
 *
 * iOS 네이티브 인라인 달력(UICalendarView)은 컨테이너 폭을 다 채우지 않아
 * 오른쪽에 빈 공간이 생깁니다. react-native-calendars의 Calendar는 폭을 꽉
 * 채우고 앱 톤(에디토리얼)에 맞춰 스타일링됩니다. 시간은 컴팩트 네이티브
 * 피커로 따로 받습니다.
 */
export function DatePicker({ date, onChangeDate }: IDatePickerProps) {
  const theme = useTheme();
  const minimumDate = new Date();

  const isValid = date instanceof Date && !Number.isNaN(date.getTime());
  const safeDate = !isValid || date < minimumDate ? minimumDate : date;

  const selected = dayjs(safeDate).format('YYYY-MM-DD');
  const minDate = dayjs(minimumDate).format('YYYY-MM-DD');

  // 날짜만 바꾸고 기존 시간은 유지합니다.
  const onDayPress = (day: DateData) => {
    const next = dayjs(safeDate)
      .year(day.year)
      .month(day.month - 1)
      .date(day.day)
      .toDate();
    onChangeDate(NOOP_EVENT, next);
  };

  // 시간만 바꾸고 날짜는 유지합니다.
  const onTimeChange = (_e: DateTimePickerEvent, t?: Date) => {
    if (!t) return;
    const next = dayjs(safeDate)
      .hour(t.getHours())
      .minute(t.getMinutes())
      .toDate();
    onChangeDate(NOOP_EVENT, next);
  };

  return (
    <View style={{ width: '100%' }}>
      <Calendar
        // 테마(라이트/다크)가 바뀌면 색을 다시 반영하도록 리마운트합니다.
        key={theme.background.val}
        current={selected}
        minDate={minDate}
        onDayPress={onDayPress}
        hideExtraDays
        firstDay={0}
        markedDates={{
          [selected]: { selected: true, selectedColor: theme.ink.val },
        }}
        style={{ backgroundColor: 'transparent' }}
        theme={{
          calendarBackground: 'transparent',
          textSectionTitleColor: theme.colorSubtle.val,
          monthTextColor: theme.color.val,
          dayTextColor: theme.color.val,
          textDisabledColor: theme.colorMuted.val,
          todayTextColor: theme.accent.val,
          selectedDayBackgroundColor: theme.ink.val,
          selectedDayTextColor: theme.onInk.val,
          arrowColor: theme.accent.val,
          textMonthFontWeight: '600',
          textMonthFontSize: 16,
          textDayFontWeight: '500',
          textDayFontSize: 16,
          textDayHeaderFontSize: 12,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
          paddingHorizontal: 6,
        }}
      >
        <Text fontSize={16} fontWeight="600" color="$color">
          Time
        </Text>
        <DateTimePicker
          value={safeDate}
          mode="time"
          display="compact"
          onChange={onTimeChange}
          accentColor={theme.accent.val}
        />
      </View>
    </View>
  );
}
