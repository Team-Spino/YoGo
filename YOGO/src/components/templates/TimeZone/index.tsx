import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FloatingButton, HeaderRightButton, TimeZoneList } from 'components';
import * as S from './style';
import { SearchBottomSheet } from 'components';
import { IconDownArrow, IconSearch } from 'assets';

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

    {/* 캘린더 하기 전까지 */}
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
