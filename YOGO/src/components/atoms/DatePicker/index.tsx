import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as S from './style';

interface IDatePickerProps {
  date: Date;
  onChangeDate: (event: DateTimePickerEvent, date: Date | undefined) => void;
}

export function DatePicker({ date, onChangeDate }: IDatePickerProps) {
  
  return (
      <S.Container>
        <DateTimePicker
        testID="dateTimePicker" 
        value={date}
        minimumDate={new Date()}
        mode={'datetime'}
        onChange={onChangeDate}
        display="inline"
        accentColor='#6564CC'
        locale="EN"
        />
   </S.Container>
  );
}
