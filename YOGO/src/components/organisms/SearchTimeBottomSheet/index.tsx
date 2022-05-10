import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { ResultSheet, SearchSheet, SearchTarget } from 'components';
import { IconBottomSheetBar } from 'assets';
import { useBottomSheet } from 'hooks';
import * as S from './style';
import { DUMMY_DATA_CITY } from 'utils';

interface ISearchBSProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectTarget : (cardlist: string) => void;
}

export const SearchTimeBottomSheet = ({
  modalVisible,
  setModalVisible,
  selectTarget,
}: ISearchBSProps) => {

  const { translateY, screenHeight, panResponders, onCloseBottomSheet } = useBottomSheet({
    modalVisible,
    setModalVisible,
  });

  const [city, setCity] = useState('');

  const targetList = DUMMY_DATA_CITY.filter(item =>
    item.city.toUpperCase().includes(city.toUpperCase()),
  );


  const onChangeCity = (city: string) => {
    setCity(city);
  };

  const onSubmitCity = (city: string) => {
    selectTarget(city)
    onCloseBottomSheet()
  };

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
          <SearchTarget targetList={targetList} city={city} onChangeCity={onChangeCity} onSubmitCity={onSubmitCity} />
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};
