import React from 'react';
import { Animated, Modal, TouchableWithoutFeedback } from 'react-native';
import { View, useTheme } from '@tamagui/core';
import { SearchTarget } from 'components';
import { IconBottomSheetBar } from 'assets';
import { useBottomSheet, useCitySearch } from 'hooks';

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

  // RN Animated.View의 style 객체는 토큰 문자열을 못 받으므로 실제 값을 읽습니다.
  const theme = useTheme();

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
      <View
        flex={1}
        justifyContent="flex-end"
        backgroundColor="rgba(0, 0, 0, 0.4)"
      >
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View flex={1} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            height: screenHeight * 0.95,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: theme.background.val,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 12,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <IconBottomSheetBar />
          <SearchTarget targetList={targetList} city={city} onChangeCity={onChangeCity} onSubmitCity={onSubmitCity} />
        </Animated.View>
      </View>
    </Modal>
  );
};
