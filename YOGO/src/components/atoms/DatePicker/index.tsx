import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as S from './style';

interface IDatePickerProps {
  text: string;
  onPress: () => void;
}

export function DatePicker({ text, onPress }: IDatePickerProps) {
    
  // (임시) page에서 넘겨줘야함 
  const [date, setDate] = useState(new Date());

  const onChange = (event: any, selectedDate: any)   => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };

  return (
      <S.Container>
        <DateTimePicker
        testID="dateTimePicker" 
        value={date}
        minimumDate={new Date()}
        mode={'date'}
        onChange={onChange}
        display="inline"
        />
   </S.Container>
  );
}
