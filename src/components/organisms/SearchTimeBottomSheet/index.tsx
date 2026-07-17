import React from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { SearchTarget } from 'components';
import { IconBottomSheetBar } from 'assets';
import { useBottomSheet, useCitySearch } from 'hooks';
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

  const { city, setCity, targetList, onChangeCity } = useCitySearch();

  // 여기서는 고른 도시를 화면에 남기지 않고, 카드로 넘긴 뒤 검색어를 비웁니다.
  const onSubmitCity = (selected: string) => {
    selectTarget(selected);
    closeBottomSheet();
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
