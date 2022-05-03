import React from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  BottomSheetBtn,
  HeaderCenter,
  SelectTargetCityBtn,
  SelectTargetDate,
} from 'components';
import * as S from './style';

interface ISetCityAndDateProps {
  city: string;
  date: Date;
  isBottomSheet: boolean;
  onChangeDate: (event: DateTimePickerEvent, date?: Date | undefined) => void;
  onPressSearchTargetCity: () => void;
  onPressFind?: () => void;
}

export function SetCityAndDate({
  city,
  date,
  isBottomSheet,
  onChangeDate,
  onPressSearchTargetCity,
  onPressFind,
}: ISetCityAndDateProps) {
  return (
    <S.Container>
      <S.Wrapper>
        {isBottomSheet && <HeaderCenter text={`Search Time Zone`} size={18} />}
        <SelectTargetCityBtn
          onPress={() => onPressSearchTargetCity()}
          text={city.trim() === '' ? '국가, 도시' : city}
        />
        <SelectTargetDate onChangeDate={onChangeDate} date={date} />

        {isBottomSheet && (
          <BottomSheetBtn
            text={'FIND'}
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
}
