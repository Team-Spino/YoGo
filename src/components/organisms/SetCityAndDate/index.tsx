import React from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SelectTargetCityBtn, SelectTargetDate } from 'components';
import * as S from './style';

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
    <S.Container>
      <SelectTargetCityBtn
        onPress={() => onPressSearchTargetCity()}
        city={city}
        date={date}
        setAlartDate={setAlartDate}
        isCityInputValid={isCityInputValid}
      />
      <SelectTargetDate onChangeDate={onChangeDate} date={date} />
    </S.Container>
  );
}
