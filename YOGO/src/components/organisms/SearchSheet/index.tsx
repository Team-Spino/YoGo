import React, { useState } from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  SearchTarget,
  SelectTargetCityBtn,
  SelectTargetDate,
  HeaderCenter,
  BottomSheetBtn,
} from 'components';
import { DUMMY_DATA_CITY } from 'utils';
import * as S from './style';
interface ISearchBSProps {
  onPress: () => void;
}
export const SearchSheet = ({ onPress }: ISearchBSProps) => {

  const [date, setDate] = useState(new Date());
  const [city, setCity] = useState('');

  const [selectedSearchTargetCity, setSelectedSearchTargetCity] =
    useState<boolean>(false);

  const targetList = DUMMY_DATA_CITY.filter(item =>
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
    setCity(city);
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <S.SearchBox>
      {!selectedSearchTargetCity && (
        <S.ScrollView showsVerticalScrollIndicator={false}>
          <S.Inner>
            <HeaderCenter text={`Search Time Zone`} size={18} />

            <SelectTargetCityBtn
              onPress={() => onPressSearchTargetCity()}
              city={city.trim() === '' ? '국가, 도시' : city}
            />
            <SelectTargetDate onChangeDate={onChangeDate} date={date} />
            <BottomSheetBtn text={'FIND'} onPress={onPress} />
          </S.Inner>
        </S.ScrollView>
      )}
      
      {selectedSearchTargetCity && (
        <SearchTarget
          targetList={targetList}
          city={city}
          onChangeCity={onChangeCity}
          onSubmitCity={onSubmitCity}
        />
      )}
    </S.SearchBox>
  );
};
