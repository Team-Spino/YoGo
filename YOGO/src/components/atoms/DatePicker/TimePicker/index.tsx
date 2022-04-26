import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as S from './style';

interface ITimePickerProps {
  text: string;
  onPress: () => void;
}

export function TimePicker({ text, onPress }: ITimePickerProps) {
    
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
        mode={'time'}
        is24Hour={true}
        onChange={onChange}
        display = 'spinner'
        />
   </S.Container>
  );
}
