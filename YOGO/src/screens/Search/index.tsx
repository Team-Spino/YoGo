import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HeaderRightButton } from 'components';
import * as S from './style';
import { SearchBottomSheet } from 'components';





export function Search() {

  const [ modalVisible, setModalVisible ] = useState<boolean>(false);
  const navigation = useNavigation();


  const pressButton = () => {
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
    <S.openBottomSheet
        title={"Open BottomSheet!"}
        onPress={pressButton}
    />
    <SearchBottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
    />
  </S.Container>

  );
}
