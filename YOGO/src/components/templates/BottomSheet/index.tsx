import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { ResultSheet, SearchSheet } from 'components';
import { IconBottomSheetBar } from 'assets';
import { useBottomSheet } from 'hooks';
import { IMakeProps, RootStackParamList } from 'types';
import * as S from './style';

interface ISearchBSProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  navigation: NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;
}

export const BottomSheet = ({
  modalVisible,
  setModalVisible,
  navigation,
}: ISearchBSProps) => {
  const [result, setResult] = useState<boolean>(false);
  const [submitObject, setSubmitObject] = useState<IMakeProps>({
    TARGET_CITY: '',
    TARGET_DAY: '',
  });

  const { translateY, screenHeight, panResponders, closeBottomSheet } =
    useBottomSheet({
      modalVisible,
      setModalVisible,
      setResult,
    });

  const onPressBottomSheetFindBtn = ({
    TARGET_CITY,
    TARGET_DAY,
  }: IMakeProps) => {
    setSubmitObject({ TARGET_CITY, TARGET_DAY });
    setResult(true);
  };

  const onPressBottomSheetMakeBtn = ({
    TARGET_CITY,
    TARGET_DAY,
  }: IMakeProps) => {
    closeBottomSheet();
    navigation.push('HandleSchedule', {
      title: 'Add',
      item: { TARGET_CITY, TARGET_DAY: dayjs(TARGET_DAY).format('YYYY-MM-DD'), isFromBottomSheet: true } as IMakeProps,
    });
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
          {result && (
            <ResultSheet
              onPress={onPressBottomSheetMakeBtn}
              submitObject={submitObject}
            />
          )}
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};
