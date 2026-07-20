import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView } from 'react-native';
import { View } from '@tamagui/core';
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

const screenHeight = Dimensions.get('screen').height;

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
    <View
      height="100%"
      width="100%"
      justifyContent="flex-start"
      alignItems="center"
    >
      {!isCityPickerOpen && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: '100%', height: '100%' }}
        >
          <View
            width="100%"
            height={screenHeight * 0.9}
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <HeaderCenter text={`Search Time Zone`} size={18} />
            <SelectTargetCityBtn
              onPress={openCityPicker}
              city={city}
              isCityInputValid={isCityInputValid}
            />
            <SelectTargetDate onChangeDate={onChangeDate} date={date} />
            <BottomSheetBtn text={'FIND'} onPress={onSubmit} />
          </View>
        </ScrollView>
      )}

      {isCityPickerOpen && (
        <View
          width="100%"
          height={screenHeight * 0.9}
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <SearchTarget
            targetList={targetList}
            city={city}
            onChangeCity={onChangeCity}
            onSubmitCity={selectCity}
          />
        </View>
      )}
    </View>
  );
};
