import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
import {
  ResultSheet,
  SearchSheet
} from 'components';
import { IconBottomSheetBar } from 'assets';
import * as S from './style';
interface ISearchBSProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const BottomSheet = ({
  modalVisible,
  setModalVisible,
}: ISearchBSProps) => {

    const [result, setResult] =
  useState<boolean>(false);

  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
      setResult(false);
    });
  };

  const onPressBottomSheetFindBtn = () => {
    setResult(true);
  }
  const onPressBottomSheetMakeBtn = () => {
    setResult(true);
  }

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent
    >
      <S.Overlay>
        <TouchableWithoutFeedback onPress={closeModal}>
          <S.Background />
        </TouchableWithoutFeedback>

        <S.Container
          height={screenHeight}
          isResult={result}
          style={{ transform: [{ translateY: translateY }] }}
          {...panResponders.panHandlers}
        >
          <IconBottomSheetBar />
          {!result && (<SearchSheet onPress={onPressBottomSheetFindBtn}/>)}
          {result && (<ResultSheet onPress={onPressBottomSheetMakeBtn}/>)}
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};
