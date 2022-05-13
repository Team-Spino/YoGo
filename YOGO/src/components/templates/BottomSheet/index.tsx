import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { ResultSheet, SearchSheet } from 'components';
import { IconBottomSheetBar } from 'assets';
import { useBottomSheet } from 'hooks';
import * as S from './style';

interface ISearchBSProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const BottomSheet = ({
  modalVisible,
  setModalVisible,
}: ISearchBSProps) => {
  const [result, setResult] = useState<boolean>(false);


  const { translateY, screenHeight, panResponders, closeBottomSheet } = useBottomSheet({
    modalVisible,
    setModalVisible,
    setResult,
  });

  const onPressBottomSheetFindBtn = () => {
    setResult(true);
  };

  const onPressBottomSheetMakeBtn = () => {
    closeBottomSheet()
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
          isResult={result}
          style={{ transform: [{ translateY: translateY }] }}
          {...panResponders.panHandlers}
        >
          <IconBottomSheetBar />
          {!result && <SearchSheet onPress={onPressBottomSheetFindBtn} />}
          {result && <ResultSheet onPress={onPressBottomSheetMakeBtn} />}
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};
