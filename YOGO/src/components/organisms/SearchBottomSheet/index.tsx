import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  SearchTarget,
  SelectTargetCityBtn,
  SelectTargetDate,
  HeaderCenter,
  BottomSheetBtn,
} from 'components';
import { IconBottomSheetBar } from 'assets';
import { DUMMY_DATA_CITY } from 'utils';
import * as S from './style';
interface ISearchBSProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const SearchBottomSheet = ({
  modalVisible,
  setModalVisible,
}: ISearchBSProps) => {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');

  const [selectedSearchTargetCity, setSelectedSearchTargetCity] =
    useState<boolean>(false);

  const targetList = DUMMY_DATA_CITY.filter(item =>
    item.city.toUpperCase().includes(text.toUpperCase()),
  );
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const onChangeText = (text: string) => {
    setText(text);
  };

  const onPressSearchTargetCity = () => {
    setSelectedSearchTargetCity(true);
    setText('');
  };

  const onSubmitText = (city: string) => {
    setSelectedSearchTargetCity(false);
    setText(city);
  };

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

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
      setSelectedSearchTargetCity(false);
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
        <TouchableWithoutFeedback onPress={closeModal}>
          <S.Background />
        </TouchableWithoutFeedback>

        <S.Container
          style={{ transform: [{ translateY: translateY }] }}
          {...panResponders.panHandlers}
        >
          <IconBottomSheetBar />
          <S.ScrollView showsVerticalScrollIndicator={false}>
            <S.SearchBox>
              {!selectedSearchTargetCity && (
                <>
                  <HeaderCenter text={`Search Time Zone`} size={18} />
                  <SelectTargetCityBtn
                    onPress={() => onPressSearchTargetCity()}
                    text={text.trim() === '' ? '국가, 도시' : text}
                  />
                  <SelectTargetDate onChangeDate={onChangeDate} date={date} />

                  {/* 다음 페이지가 완성되고 onPress를 추가 할것 */}
                  <BottomSheetBtn
                    text={'FIND'}
                    onPress={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                  />
                </>
              )}
            </S.SearchBox>
          </S.ScrollView>
          {selectedSearchTargetCity && (
            <SearchTarget
              targetList={targetList}
              text={text}
              onChangeText={onChangeText}
              onSubmitText={onSubmitText}
            />
          )}
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};
