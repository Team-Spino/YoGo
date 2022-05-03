import React, { useEffect, useRef, useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SearchTarget, SetCityAndDate } from 'components';
import { IconBottomSheetBar } from 'assets';
import { DUMMY_DATA_CITY } from 'utils';
import { useBottomSheet } from 'hooks';
import * as S from './style';
interface ISearchBSProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const SearchBottomSheet = ({
  modalVisible,
  setModalVisible,
}: ISearchBSProps) => {
  const [date, setDate] = useState(new Date());
  const [city, setCity] = useState('');

  const [selectedSearchTargetCity, setSelectedSearchTargetCity] =
    useState<boolean>(false);

  const targetList = DUMMY_DATA_CITY.filter(item =>
    item.city.toUpperCase().includes(city.toUpperCase()),
  );

  const onChangeCity = (text: string) => {
    setCity(text);
  };

  const onSubmitCity = (city: string) => {
    setSelectedSearchTargetCity(false);
    setCity(city);
  };

  const onPressSearchTargetCity = () => {
    setSelectedSearchTargetCity(true);
    setCity('');
  };

  const onCloseBottomSheet = () => {
    setModalVisible(false);
    setSelectedSearchTargetCity(false);
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const { translateY, screenHeight, panResponders } = useBottomSheet({
    modalVisible,
    onCloseBottomSheet,
  });

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent
    >
      <S.Overlay>
        <TouchableWithoutFeedback onPress={onCloseBottomSheet}>
          <S.Background />
        </TouchableWithoutFeedback>

        <S.Container
          height={screenHeight}
          style={{ transform: [{ translateY: translateY }] }}
          {...panResponders.panHandlers}
        >
          <IconBottomSheetBar />
          <S.SearchBox>
            {!selectedSearchTargetCity && (
              <SetCityAndDate
                city={city}
                date={date}
                isBottomSheet={true}
                onChangeDate={onChangeDate}
                onPressSearchTargetCity={onPressSearchTargetCity}
              />
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
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};
