import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  FloatingButton,
  HeaderRightButton,
  TimeZoneList,
  BottomSheet,
  SearchTimeBottomSheet,
} from 'components';
import { IconSearch } from 'assets';
import * as S from './style';

export function TimeZone() {
  const [cardState, setCardState] = useState<Array<string>>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [timeSearchVisible, setTimeSearchVisible] = useState<boolean>(false);
  const navigation = useNavigation();

  const pressBottomSheet = () => {
    setModalVisible(true);
  };

  const pressHeaderRightButton = () => {
    setTimeSearchVisible(true);
  };

  const selectTarget = (city: string) => {
    setCardState([...cardState, city]);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          name={''}
          onPress={() => pressHeaderRightButton()}
        ></HeaderRightButton>
      ),
    });
  }, [navigation]);

  return (
    <>
      <S.Container>
        <TimeZoneList cardList={cardState} />
        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <SearchTimeBottomSheet
          modalVisible={timeSearchVisible}
          setModalVisible={setTimeSearchVisible}
          selectTarget={selectTarget}
        />
      </S.Container>
      <FloatingButton onPress={() => pressBottomSheet()}>
        <IconSearch color="white" />
      </FloatingButton>
    </>
  );
}
