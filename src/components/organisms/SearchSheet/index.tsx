import React, { useState } from 'react';
import { Alert } from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  SearchTarget,
  SelectTargetCityBtn,
  SelectTargetDate,
  HeaderCenter,
  BottomSheetBtn,
} from 'components';
import { useCitySearch } from 'hooks';
import { IMakeProps } from 'types';
import * as S from './style';

interface ISearchBSProps {
  onPress: (submitOnject: IMakeProps) => void;
}
export const SearchSheet = ({ onPress }: ISearchBSProps) => {
  const [date, setDate] = useState(new Date());

  const {
    city,
    targetList,
    isCityPickerOpen,
    isCityInputValid,
    onChangeCity,
    openCityPicker,
    selectCity,
    markCityInvalid,
  } = useCitySearch();

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) return;

    setDate(selectedDate);
  };

  const onSubmit = () => {
    if (city) {
      onPress({ TARGET_CITY: city, TARGET_DAY: date });
      return;
    }
    markCityInvalid();

    Alert.alert('Yogo', 'Please select city');
  };

  return (
    <S.SearchBox>
      {!isCityPickerOpen && (
        <S.ScrollView showsVerticalScrollIndicator={false}>
          <S.Inner>
            <HeaderCenter text={`Search Time Zone`} size={18} />
            <SelectTargetCityBtn
              onPress={openCityPicker}
              city={city}
              isCityInputValid={isCityInputValid}
            />
            <SelectTargetDate onChangeDate={onChangeDate} date={date} />
            <BottomSheetBtn text={'FIND'} onPress={onSubmit} />
          </S.Inner>
        </S.ScrollView>
      )}

      {isCityPickerOpen && (
        <S.Inner>
          <SearchTarget
            targetList={targetList}
            city={city}
            onChangeCity={onChangeCity}
            onSubmitCity={selectCity}
          />
        </S.Inner>
      )}
    </S.SearchBox>
  );
};
