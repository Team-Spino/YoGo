import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
import {
  ResultCard,
  BottomSheetBtn,
  BottomSheetHeader,
  IconAbsolute
} from 'components';
import { IconBottomSheetBar, IconWorld } from 'assets';
import * as S from './style';

interface IResultBSProps {
  modalvisibleResult: boolean;
  setmodalvisibleResult: (visible: boolean) => void;
}

export const ResultBottomSheet = ({
  modalvisibleResult,
  setmodalvisibleResult,
}: IResultBSProps) => {

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
    if (modalvisibleResult) {
      resetBottomSheet.start();
    }
  }, [modalvisibleResult]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setmodalvisibleResult(false);
    });
  };

  return (
    <Modal
      visible={modalvisibleResult}
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
          style={{ transform: [{ translateY: translateY }] }}
          {...panResponders.panHandlers}
        >
          <IconBottomSheetBar />

          <S.ResultBox>
            <BottomSheetHeader text={'We Find your Time Zone'} size={18} isWhite={true} />
            <S.Inner>
              <IconAbsolute>
                <IconWorld />
              </IconAbsolute>
              <ResultCard />
              <ResultCard />
            </S.Inner>
            <BottomSheetBtn text={'Make'} onPress={function (): void {
              throw new Error('Function not implemented.');
            } } isRevers ={true} />
          </S.ResultBox>
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};
