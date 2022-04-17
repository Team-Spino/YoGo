import React, { useState } from 'react';
import { TimeZoneList } from 'components';
import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { IconPlus } from 'assets';
import { HeaderRightButton } from 'components';
import * as S from './style';
import { SearchBottomSheet } from 'components';
export function TimeZone() {
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
