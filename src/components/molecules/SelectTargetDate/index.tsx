import React from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { View } from '@tamagui/core';
import { TextBtn, DatePicker } from 'components';
import { Eyebrow } from 'styles/ui';

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
    <View width="100%" flex={1} paddingVertical={18}>
      <Eyebrow textTransform="uppercase" letterSpacing={0.6} fontWeight="500">
        Target date
      </Eyebrow>
      <View marginTop={14}>
        <TextBtn>{`${week}, ${month} ${day}, ${year}`}</TextBtn>
      </View>
      <DatePicker onChangeDate={onChangeDate} date={date} />
    </View>
  );
}
