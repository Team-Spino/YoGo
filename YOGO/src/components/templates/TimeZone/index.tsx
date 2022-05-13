import React, { SetStateAction, useEffect, useState } from 'react';
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
import uuid from 'react-native-uuid';



export function TimeZone() {
  const [cardState , setCardState] = useState([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [timeSearchVisible, setTimeSearchVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const pressBottomSheet = () => {
    setModalVisible(true);
  };

  const pressHeaderRightButton = () => {
    setTimeSearchVisible(true);
  }

  const selectTarget = (city: string) => {
    const nextCity = [...cardState, { key: `${uuid.v4()}`, location: city }];
    setCardState(nextCity);
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton name={''} onPress={() => pressHeaderRightButton()}></HeaderRightButton>
      ),
    });
  }, [navigation]);

  return (
    <>
      <S.Container>
        <TimeZoneList cardState={cardState} setCardState = {setCardState} />
        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <SearchTimeBottomSheet 
          modalVisible={timeSearchVisible}
          setModalVisible={setTimeSearchVisible}
          selectTarget ={selectTarget}
        />
      </S.Container>
      <FloatingButton onPress={() => pressBottomSheet()}>
        <IconSearch color="white" />
      </FloatingButton>
    </>
  );
}

