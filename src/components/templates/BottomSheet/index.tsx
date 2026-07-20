import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Animated } from 'react-native';
import { View, useTheme } from '@tamagui/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { ResultSheet, SearchSheet } from 'components';
import { useBottomSheet } from 'hooks';
import { IMakeProps, RootStackParamList } from 'types';

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
  const theme = useTheme();
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
      item: {
        TARGET_CITY,
        TARGET_DAY: dayjs(TARGET_DAY).format('YYYY-MM-DD HH:mm:ss'),
        isFromBottomSheet: true,
      } as IMakeProps,
    });
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
            backgroundColor: result ? theme.accent.val : theme.background.val,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
            shadowColor: '#4A3F9E',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.12,
            shadowRadius: 20,
            elevation: 16,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <View
            width={40}
            height={5}
            borderRadius={3}
            marginTop={2}
            marginBottom={6}
            backgroundColor={
              result ? 'rgba(255, 255, 255, 0.6)' : '$borderColorStrong'
            }
          />
          {!result && <SearchSheet onPress={onPressBottomSheetFindBtn} />}
          {result && (
            <ResultSheet
              onPress={onPressBottomSheetMakeBtn}
              submitObject={submitObject}
            />
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};
