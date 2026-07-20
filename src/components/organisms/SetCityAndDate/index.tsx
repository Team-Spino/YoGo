import React from 'react';
import { View } from '@tamagui/core';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SelectTargetCityBtn, SelectTargetDate } from 'components';

interface ISetCityAndDateProps {
  city: string;
  date: Date;
  setAlartDate: (date: string) => void;
  isCityInputValid?: boolean;
  onChangeDate: (event: DateTimePickerEvent, date: Date | undefined) => void;
  onPressSearchTargetCity: () => void;
}

export function SetCityAndDate({
  city,
  date,
  setAlartDate,
  isCityInputValid,
  onChangeDate,
  onPressSearchTargetCity,
}: ISetCityAndDateProps) {
  return (
    <View
      width="100%"
      flex={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <SelectTargetCityBtn
        onPress={() => onPressSearchTargetCity()}
        city={city}
        date={date}
        setAlartDate={setAlartDate}
        isCityInputValid={isCityInputValid}
      />
      <SelectTargetDate onChangeDate={onChangeDate} date={date} />
    </View>
  );
}
