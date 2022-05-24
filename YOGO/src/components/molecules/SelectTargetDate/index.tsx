import React from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Title, TextBtn, DatePicker } from 'components';
import * as S from './style';

interface IBTargetDateProps {
  onChangeDate: (event: DateTimePickerEvent, date: Date | undefined) => void;
  date: Date;
}

export function SelectTargetDate({ onChangeDate, date }: IBTargetDateProps) {
  const year = date.getFullYear();
  const month = date.toLocaleDateString('en', { month: 'long' });
  const day = date.getDate();
  const week = date.toLocaleDateString('en', { weekday: 'short' });

  return (
    <S.Container>
      <Title isEnable={true} text={'Select Target Date'} size={15} />
      <S.BtnContainer>
      <TextBtn>{`${week}, ${month} ${day}, ${year}`}</TextBtn>
      </S.BtnContainer>
      <DatePicker onChangeDate={onChangeDate} date={date} />
    </S.Container>
  );
}
