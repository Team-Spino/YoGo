import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDialog } from 'context/dialog';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  SearchTarget,
  SelectTargetCityBtn,
  SelectTargetDate,
  HeaderCenter,
} from 'components';
import { InkButton, InkButtonText } from 'styles/ui';
import { useCitySearch } from 'hooks';
import { IMakeProps } from 'types';

interface ISearchBSProps {
  onPress: (submitOnject: IMakeProps) => void;
}

export const SearchSheet = ({ onPress }: ISearchBSProps) => {
  const { alert } = useDialog();
  const insets = useSafeAreaInsets();
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

  const onChangeDate = (_e: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) return;
    setDate(selectedDate);
  };

  const onSubmit = () => {
    if (city) {
      onPress({ TARGET_CITY: city, TARGET_DAY: date });
      return;
    }
    markCityInvalid();
    alert('Please select a city first.');
  };

  // 도시 선택 화면(리스트)과 폼 화면은 상호배타 — 각각 자체 스크롤을 가집니다.
  if (isCityPickerOpen) {
    return (
      <SearchTarget
        targetList={targetList}
        city={city}
        onChangeCity={onChangeCity}
        onSubmitCity={selectCity}
      />
    );
  }

  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: insets.bottom + 24,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <HeaderCenter text={`Search Time Zone`} size={18} />
      <SelectTargetCityBtn
        onPress={openCityPicker}
        city={city}
        isCityInputValid={isCityInputValid}
      />
      <SelectTargetDate onChangeDate={onChangeDate} date={date} />
      <TouchableOpacity
        onPress={onSubmit}
        activeOpacity={0.85}
        style={{ marginTop: 20 }}
      >
        <InkButton>
          <InkButtonText>FIND</InkButtonText>
        </InkButton>
      </TouchableOpacity>
    </BottomSheetScrollView>
  );
};
