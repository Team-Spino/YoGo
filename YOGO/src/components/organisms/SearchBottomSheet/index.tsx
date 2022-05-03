import React, { useEffect, useRef, useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
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
import { useBottomSheet } from 'hooks';
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

  const onCloseBottomSheet = () => {
    setModalVisible(false);
    setSelectedSearchTargetCity(false);
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const { translateY, screenHeight, panResponders } = useBottomSheet({
    modalVisible,
    onCloseBottomSheet,
  });

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent
    >
      <S.Overlay>
        <TouchableWithoutFeedback onPress={onCloseBottomSheet}>
          <S.Background />
        </TouchableWithoutFeedback>

        <S.Container
          height={screenHeight}
          style={{ transform: [{ translateY: translateY }] }}
          {...panResponders.panHandlers}
        >
          <IconBottomSheetBar />
          <S.SearchBox>
            {!selectedSearchTargetCity ? (
              <S.ScrollView showsVerticalScrollIndicator={false}>
                <S.Inner>
                  <HeaderCenter text={`Search Time Zone`} size={18} />

                  <SelectTargetCityBtn
                    onPress={() => onPressSearchTargetCity()}
                    text={text.trim() === '' ? '국가, 도시' : text}
                  />
                  <SelectTargetDate onChangeDate={onChangeDate} date={date} />

                  <BottomSheetBtn
                    text={'FIND'}
                    onPress={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                  />
                </S.Inner>
              </S.ScrollView>
            ) : (
              <SearchTarget
                targetList={targetList}
                text={text}
                onChangeText={onChangeText}
                onSubmitText={onSubmitText}
              />
            )}
          </S.SearchBox>
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};
