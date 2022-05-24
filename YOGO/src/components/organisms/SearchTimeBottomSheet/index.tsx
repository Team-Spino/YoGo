import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { SearchTarget } from 'components';
import { IconBottomSheetBar } from 'assets';
import { useBottomSheet } from 'hooks';
import { TZ_DATA_BASES  } from 'utils';
import * as S from './style';

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

  const { translateY, screenHeight, panResponders, closeBottomSheet } = useBottomSheet({
    modalVisible,
    setModalVisible,
  });

  const [city, setCity] = useState('');

  const targetList = TZ_DATA_BASES .filter(item =>
    item.city.toUpperCase().includes(city.toUpperCase()),
  );


  const onChangeCity = (city: string) => {
    setCity(city);
  };

  const onSubmitCity = (city: string) => {
    selectTarget(city)
    closeBottomSheet()
    setCity('');
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent
    >
      <S.Overlay>
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
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
