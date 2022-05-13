import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import {
  FloatingButton,
  HeaderRightButton,
  TimeZoneList,
  BottomSheet,
  SearchTimeBottomSheet,
} from 'components';
import { IconSearch } from 'assets';
import { ICityProps } from 'types';
import {
  connectDB,
  createTimezoneTable,
  getTimezoneItems,
  insertTimezoneItem,
  deleteTimezoneItem,
  dropTimezoneTable,
} from 'db';
import * as S from './style';

export function TimeZone() {
  const [cardState, setCardState] = useState<Array<ICityProps>>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [timeSearchVisible, setTimeSearchVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const pressBottomSheet = () => {
    setModalVisible(true);
  };

  const pressHeaderRightButton = () => {
    setTimeSearchVisible(true);
  };

  const selectTarget = async (city: string) => {
    const db = await connectDB();
    const id = await insertTimezoneItem(db, city);

    setCardState([...cardState, { key: id, CITY: city }]);
  };

  const onDeleteTarget = async (id: number) => {
    
    setCardState(cardState.filter(item => item.key !== id));

    const db = await connectDB();
    await deleteTimezoneItem(db, id);
  };

  const initDB = useCallback(async () => {
    try {
      const db = await connectDB();
      await createTimezoneTable(db);
      const items = await getTimezoneItems(db);
      setCardState(items);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    initDB();
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          name={''}
          onPress={() => pressHeaderRightButton()}
        ></HeaderRightButton>
      ),
    });
  }, [navigation, initDB]);

  return (
    <>
      <S.Container>
        <TimeZoneList cardState={cardState} setCardState = {setCardState} onDeleteTarget={onDeleteTarget} />
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

