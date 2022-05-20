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
import { TZ_DATA_BASES  } from 'utils';
import { IMakeProps } from 'types';
import * as S from './style';

interface ISearchBSProps {
  onPress: (submitOnject: IMakeProps) => void;
}
export const SearchSheet = ({ onPress }: ISearchBSProps) => {
  const [date, setDate] = useState(new Date());
  const [city, setCity] = useState('');
  const [isCityInputValid, setIsCityInputValid] = useState(true);

  const [selectedSearchTargetCity, setSelectedSearchTargetCity] =
    useState<boolean>(false);

  const targetList = TZ_DATA_BASES .filter(item =>
    item.city.toUpperCase().includes(city.toUpperCase()),
  );

  const onPressSearchTargetCity = () => {
    setSelectedSearchTargetCity(true);
    setCity('');
  };

  const onChangeCity = (text: string) => {
    setCity(text);
  };

  const onSubmitCity = (city: string) => {
    setSelectedSearchTargetCity(false);
    setIsCityInputValid(true);
    setCity(city);
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onSubmit = () => {
    if (city) {
      onPress({ TARGET_CITY: city, TARGET_DAY: date });
      return;
    }
    setIsCityInputValid(false);

    Alert.alert('Yogo', 'Please select city');
  };

  return (
    <S.SearchBox>
      {!selectedSearchTargetCity && (
        <S.ScrollView showsVerticalScrollIndicator={false}>
          <S.Inner>
            <HeaderCenter text={`Search Time Zone`} size={18} />
            <SelectTargetCityBtn
              onPress={() => onPressSearchTargetCity()}
              city={city}
              isCityInputValid={isCityInputValid}
            />
            <SelectTargetDate onChangeDate={onChangeDate} date={date} />
            <BottomSheetBtn text={'FIND'} onPress={onSubmit} />
          </S.Inner>
        </S.ScrollView>
      )}

      {selectedSearchTargetCity && (
        <S.Inner>
          <SearchTarget
            targetList={targetList}
            city={city}
            onChangeCity={onChangeCity}
            onSubmitCity={onSubmitCity}
          />
        </S.Inner>
      )}
    </S.SearchBox>
  );
};
