import React from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { View } from '@tamagui/core';
import { Title, TextBtn, DatePicker } from 'components';

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
    <View
      marginTop={15}
      width="100%"
      flex={1}
      borderBottomColor="rgba(0, 0, 0, 0.1)"
      borderBottomWidth={1}
      paddingHorizontal={20}
      paddingTop={0}
      paddingBottom={15}
    >
      <Title isEnable={true} text={'Select Target Date'} size={15} />
      <View marginTop={15}>
        <TextBtn>{`${week}, ${month} ${day}, ${year}`}</TextBtn>
      </View>
      <DatePicker onChangeDate={onChangeDate} date={date} />
    </View>
  );
}
