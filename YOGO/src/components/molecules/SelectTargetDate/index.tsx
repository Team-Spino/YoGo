import React from 'react';
import { Title, TextBtn, DatePicker } from 'components';
import * as S from './style';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Text } from 'react-native';

interface IBTargetDateProps {
  onChangeDate: (event: DateTimePickerEvent, date?: Date | undefined) => void;
  date : Date;
}


export function SelectTargetDate({ onChangeDate ,date}: IBTargetDateProps) {
  const year = date.getFullYear();
  const month = date.toLocaleDateString('en', { month: 'long' })
  const day = date.getDate();
  const week = date.toLocaleDateString('en', { weekday: 'short' })


  return (
    <S.Container>
      <Title isEnable={true} text={"상대 날짜 선택"} size={15} />
        <TextBtn>{`${week}, ${month} ${day}, ${year}`}</TextBtn>
        <DatePicker onChangeDate={onChangeDate} date={date}/>
    </S.Container>
  );
}
