import React, { useState } from 'react';
import { TimeZoneList } from 'components';
import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { IconPlus } from 'assets';
import { HeaderRightButton } from 'components';
import * as S from './style';
import { SearchBottomSheet } from 'components';
export function TimeZone() {

  const dummyList = [
    { id: 1, name: 'Tokyo' },
    { id: 2, name: 'Osaka' },
    { id: 3, name: 'Kyoto' },
    { id: 4, name: 'Hokkaido' },
    { id: 5, name: 'Sapporo' },
    { id: 6, name: 'Fukuoka' },
    { id: 7, name: 'Kumamoto' },
    { id: 8, name: 'Okinawa' },
    { id: 9, name: 'Kagoshima' },
    { id: 10, name: 'Saitama' },
    { id: 11, name: 'Chiba' },
    { id: 12, name: 'Kanagawa' },
    { id: 13, name: 'Aichi' },
    { id: 14, name: 'Miyazaki' },
    { id: 15, name: 'Nagoya' },
    { id: 16, name: 'Fukushima' },
    { id: 17, name: 'Gifu' },
    { id: 18, name: 'Shizuoka' },
  ]



  const [ modalVisible, setModalVisible ] = useState(false);
  const pressButton = () => {
      setModalVisible(true);
  }
  const navigation = useNavigation();
  navigation.setOptions({
    // headerRight: () => <HeaderRightButton></HeaderRightButton>,
  });
  return(
    <View style={styles.rootContainer}>
    <Button
        title={"Open BottomSheet!"}
        onPress={pressButton}
    />
    <SearchBottomSheet
        targetList= {dummyList}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
    />
</View>

  );
}
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
