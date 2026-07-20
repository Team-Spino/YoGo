import React from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface IDatePickerProps {
  date: Date;
  onChangeDate: (event: DateTimePickerEvent, date: Date | undefined) => void;
}

export function DatePicker({ date, onChangeDate }: IDatePickerProps) {
  return (
    <TouchableOpacity style={{ width: '100%' }}>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        minimumDate={new Date()}
        mode={'datetime'}
        onChange={onChangeDate}
        display="inline"
        accentColor="#6564CC"
        locale="EN"
        themeVariant="light"
      />
    </TouchableOpacity>
  );
}
