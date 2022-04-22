import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FloatingButton, HeaderRightButton, TimeZoneList } from 'components';
import * as S from './style';
import { SearchBottomSheet } from 'components';





export function Search() {

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
    <S.Container>
      <TimeZoneList />
      <FloatingButton 
        // onPress={pressBottomSheet} : merge이후에 하겠습니다
      />
      {/* merge이후에 하겠습니다 */}
    {/* <S.openBottomSheet
        title={"Open BottomSheet!"}
        onPress={pressButton}
    />
    <SearchBottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
    /> */}
  </S.Container>

  );
}
