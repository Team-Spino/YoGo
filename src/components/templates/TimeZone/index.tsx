import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  FloatingButton,
  HeaderRightButton,
  TimeZoneList,
  BottomSheet,
  SearchTimeBottomSheet,
} from 'components';
import { IconSearch } from 'assets';
import { ICityProps, RootStackParamList } from 'types';
import {
  addTimezone,
  findTimezones,
  initTimezoneTable,
  removeTimezone,
} from 'db';
import * as S from './style';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function TimeZone({ navigation }: { navigation: Prop }) {
  const [cardState, setCardState] = useState<Array<ICityProps>>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [timeSearchVisible, setTimeSearchVisible] = useState<boolean>(false);

  const pressBottomSheet = () => {
    setModalVisible(true);
  };

  const pressHeaderRightButton = () => {
    setTimeSearchVisible(true);
  };

  const selectTarget = async (city: string) => {
    const id = await addTimezone(city);

    setCardState([...cardState, { key: id, CITY: city }]);
  };

  const onDeleteTarget = async (id: number) => {
    setCardState(cardState.filter(item => item.key !== id));

    await removeTimezone(id);
  };

  const initDB = useCallback(async () => {
    try {
      await initTimezoneTable();

      const items = await findTimezones();
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
        <TimeZoneList
          cardState={cardState}
          setCardState={setCardState}
          onDeleteTarget={onDeleteTarget}
        />
        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
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
