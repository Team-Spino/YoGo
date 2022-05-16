import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResultSheet, SearchSheet } from 'components';
import { IconBottomSheetBar } from 'assets';
import { useBottomSheet } from 'hooks';
import { IMakeProps, RootStackParamList } from 'types';
import * as S from './style';

interface ISearchBSProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  navigation :  NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>
}

export const BottomSheet = ({
  modalVisible,
  setModalVisible,
  navigation,
}: ISearchBSProps) => {
  const [result, setResult] = useState<boolean>(false);
  const [submitObject , setSubmitObject] = useState<IMakeProps>({
    city: '',
    date: '',
  });

  const { translateY, screenHeight, panResponders, closeBottomSheet } = useBottomSheet({
    modalVisible,
    setModalVisible,
    setResult,
  });

  const onPressBottomSheetFindBtn = ({city, date}:IMakeProps) => {
    setSubmitObject({city, date});
    setResult(true);
  };



  const onPressBottomSheetMakeBtn = ({city, date} : IMakeProps) => {
    closeBottomSheet()
    navigation.push('HandleSchedule', { title: 'Add', item: {city, date} });
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
          {result && <ResultSheet onPress={onPressBottomSheetMakeBtn} submitObject ={submitObject}/>}
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};
