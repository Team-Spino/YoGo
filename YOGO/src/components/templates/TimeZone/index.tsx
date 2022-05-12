import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  FloatingButton,
  HeaderRightButton,
  TimeZoneList,
  BottomSheet,
  SearchTimeBottomSheet,
  TimeZoneCard,
} from 'components';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSwipeList } from 'hooks';
import { IconSearch } from 'assets';
import * as S from './style';
import { Animated, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid';



export function TimeZone() {
  const [cardState , setCardState] = useState([
      { key: '1', location: 'Asia/Seoul' },
      { key: '2', location: 'Asia/Tokyo' },
      { key: '3', location: 'Asia/Chita' },
      { key: '4', location: 'Asia/Sakhalin' },
      { key: '5', location: 'Europe/Budapest' },
      { key: '6', location: 'Europe/Sarajevo' },
      { key: '7', location: 'Europe/Copenhagen' },
      { key: '8', location: 'Asia/Seoul' },
  ]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [timeSearchVisible, setTimeSearchVisible] = useState<boolean>(false);
  const {rowTranslateAnimatedValues, isOpen, onSwipeValueChange, deleteRow} = useSwipeList({listData : cardState, setListData: setCardState , rowBackValue: '70'});

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


  const renderItem = data => (
    <Animated.View
        style={[
            {
                height : rowTranslateAnimatedValues[
                    data.item.key
                ].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 70],
                }),
            },
        ]}
    >
    <TouchableHighlight
        onPress={() => console.log('You touched me')}
    >
            <TimeZoneCard key={data.item.key} location={data.item.location} />
    </TouchableHighlight>
</Animated.View>
);

const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => deleteRow(data.item.key)}
        >
            <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
    </View>
);


return (
    <View style={styles.container}>
        <SwipeListView
            disableRightSwipe
            data={cardState}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={isOpen}
            onSwipeValueChange={onSwipeValueChange}
            useNativeDriver={false}
        />
    </View>
);

//   return (
//     <>
//       <S.Container>
//         <TimeZoneList cardList={cardState} />
//         <BottomSheet
//           modalVisible={modalVisible}
//           setModalVisible={setModalVisible}
//         />
//         <SearchTimeBottomSheet 
//           modalVisible={timeSearchVisible}
//           setModalVisible={setTimeSearchVisible}
//           selectTarget ={selectTarget}
//         />
//       </S.Container>
//       <FloatingButton onPress={() => pressBottomSheet()}>
//         <IconSearch color="white" />
//       </FloatingButton>
//     </>
//   );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});