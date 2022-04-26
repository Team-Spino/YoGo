import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FloatingButton, HeaderRightButton, TimeZoneList, SearchBottomSheet } from 'components';
import { IconSearch } from 'assets';
import * as S from './style';


export function TimeZone() {

  const [ modalVisible, setModalVisible ] = useState<boolean>(false);
  const navigation = useNavigation();

  const pressBottomSheet = () => {
      setModalVisible(true);
  }

  useEffect(()=>{
    navigation.setOptions({
      // 임시용 
      headerRight: () => <HeaderRightButton name={''} onPress={undefined}></HeaderRightButton>,
    });
    }, [navigation]);

  return(
    <>
    <S.Container>
      <TimeZoneList />
      <SearchBottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
      />
    </S.Container>
    <FloatingButton 
      onPress={() => pressBottomSheet()} >
          <IconSearch color='white'/>
    </FloatingButton>
    </>
  );
}
