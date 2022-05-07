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
export const SearchSheet = ({
  onPress
}: ISearchBSProps) => {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');

  const [selectedSearchTargetCity, setSelectedSearchTargetCity] =
    useState<boolean>(false);
  const targetList = DUMMY_DATA_CITY.filter(item =>
    item.city.toUpperCase().includes(text.toUpperCase()),
  );
  const onChangeText = (text: string) => {
    setText(text);
  };

  const onPressSearchTargetCity = () => {
    setSelectedSearchTargetCity(true);
    setText('');
  };

  const onSubmitText = (city: string) => {
    setSelectedSearchTargetCity(false);
    setText(city);
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
                    text={text.trim() === '' ? '국가, 도시' : text}
                  />
                  <SelectTargetDate onChangeDate={onChangeDate} date={date} />
                  <BottomSheetBtn
                    text={'FIND'}
                    onPress={onPress}/>
                </S.Inner>
              </S.ScrollView>
            )}
            
            {selectedSearchTargetCity && (
              <SearchTarget
                targetList={targetList}
                text={text}
                onChangeText={onChangeText}
                onSubmitText={onSubmitText}
              />
            )}
          </S.SearchBox>
  );
};
