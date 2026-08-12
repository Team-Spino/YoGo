import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@tamagui/core';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface IDatePickerProps {
  date: Date;
  onChangeDate: (event: DateTimePickerEvent, date: Date | undefined) => void;
}

export function DatePicker({ date, onChangeDate }: IDatePickerProps) {
  const theme = useTheme();
  const minimumDate = new Date();

  // display="inline"(iOS UICalendarView)은 value가 유효하지 않거나 minimumDate보다
  // 이르면 네이티브에서 예외를 던져 앱이 통째로 죽습니다(JS redbox로도 못 잡음).
  // 어떤 잘못된 값이 흘러와도 안전하도록 여기서 한 번 더 보정합니다.
  const isValid = date instanceof Date && !Number.isNaN(date.getTime());
  const safeDate = !isValid || date < minimumDate ? minimumDate : date;

  return (
    <TouchableOpacity style={{ width: '100%' }}>
      <DateTimePicker
        testID="dateTimePicker"
        value={safeDate}
        minimumDate={minimumDate}
        mode={'datetime'}
        onChange={onChangeDate}
        display="inline"
        accentColor={theme.accent.val}
        locale="EN"
        themeVariant="light"
      />
    </TouchableOpacity>
  );
}
