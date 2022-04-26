import React from 'react';
import { Title, TextBtn, DatePicker } from 'components';
import * as S from './style';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Text } from 'react-native';

interface IBTargetDateProps {
  onChangeDate: (event: DateTimePickerEvent, date?: Date | undefined) => void;
  text : Date;
}


export function SelectTargetDate({ onChangeDate ,text}: IBTargetDateProps) {
  const year = text.getFullYear();
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][text.getMonth()];
  const day = text.getDate();
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][text.getDay()];


  return (
    <S.Container>
      <Title isEnable={true} text={"상대 날짜 선택"} size={15} />
        <TextBtn>{`${week}, ${month} ${day}, ${year}`}</TextBtn>
        <DatePicker onChangeDate={onChangeDate} date={text}/>
    </S.Container>
  );
}
