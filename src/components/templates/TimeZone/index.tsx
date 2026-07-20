import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  FloatingButton,
  HeaderRightButton,
  TimeZoneList,
  BottomSheet,
  SearchTimeBottomSheet,
} from 'components';
import { IconSearch } from 'assets';
import { RootStackParamList } from 'types';
import { useTimezones } from 'hooks';
import * as S from './style';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function TimeZone({ navigation }: { navigation: Prop }) {
  const { timezones, addTimezone, removeTimezone } = useTimezones();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [timeSearchVisible, setTimeSearchVisible] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton onPress={() => setTimeSearchVisible(true)} />
      ),
    });
  }, [navigation]);

  return (
    <>
      <S.Container>
        <TimeZoneList
          cardState={timezones}
          onDeleteTarget={removeTimezone}
        />
        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
        />
        <SearchTimeBottomSheet
          modalVisible={timeSearchVisible}
          setModalVisible={setTimeSearchVisible}
          selectTarget={addTimezone}
        />
      </S.Container>
      <FloatingButton onPress={() => setModalVisible(true)}>
        <IconSearch color="white" />
      </FloatingButton>
    </>
  );
}
