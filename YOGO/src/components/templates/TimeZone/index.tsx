// // // import React, { useEffect, useState } from 'react';
// // // import { useNavigation } from '@react-navigation/native';
// // // import {
// // //   FloatingButton,
// // //   HeaderRightButton,
// // //   TimeZoneList,
// // //   BottomSheet,
// // //   SearchTimeBottomSheet,
// // // } from 'components';
// // // import { IconSearch } from 'assets';
// // // import * as S from './style';



// // // export function TimeZone() {
// // //   const [cardState , setCardState] = useState<string[]>([]);
// // //   const [modalVisible, setModalVisible] = useState<boolean>(false);
// // //   const [timeSearchVisible, setTimeSearchVisible] = useState<boolean>(false);
// // //   const navigation = useNavigation();

// // //   const pressBottomSheet = () => {
// // //     setModalVisible(true);
// // //   };

// // //   const pressHeaderRightButton = () => {
// // //     setTimeSearchVisible(true);
// // //   }

// // //   const selectTarget = (city: string) => {
// // //     setCardState([...cardState, city]);
// // //   }

// // //   useEffect(() => {
// // //     navigation.setOptions({
// // //       headerRight: () => (
// // //         <HeaderRightButton name={''} onPress={() => pressHeaderRightButton()}></HeaderRightButton>
// // //       ),
// // //     });
// // //   }, [navigation]);

// // //   return (
// // //     <>
// // //       <S.Container>
// // //         <TimeZoneList cardList={cardState} />
// // //         <BottomSheet
// // //           modalVisible={modalVisible}
// // //           setModalVisible={setModalVisible}
// // //         />
// // //         <SearchTimeBottomSheet 
// // //           modalVisible={timeSearchVisible}
// // //           setModalVisible={setTimeSearchVisible}
// // //           selectTarget ={selectTarget}
// // //         />
// // //       </S.Container>
// // //       <FloatingButton onPress={() => pressBottomSheet()}>
// // //         <IconSearch color="white" />
// // //       </FloatingButton>
// // //     </>
// // //   );
// // // }


import React, { useState, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';


const rowTranslateAnimatedValues = {};
Array(20)
.fill('').forEach((_,i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
});


export function TimeZone() {

    const [isOpen, setIsOpen] = useState(-70);

    const [listData, setListData] = useState(
        Array(20)
            .fill('')
            .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
    );

    const animationIsRunning = useRef(false);

    const moveHeight = (key) => {
        return (
        Animated.timing(rowTranslateAnimatedValues[key], {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        })
        )
    }

    const setNewData = (key) => {
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        setIsOpen(-70);
    }

        const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
            setIsOpen(-70)
            if(value-150 < -Dimensions.get('window').width) {
                setIsOpen(-Dimensions.get('window').width);
            }

            if (
                value < -Dimensions.get('window').width &&
                !animationIsRunning.current
            ) {
                animationIsRunning.current = true;
                moveHeight(key).start(() => {
                    setNewData(key)
                    animationIsRunning.current = false;
                });
            }
        };

        const deleteRow = (rowMap, rowKey) => {
        animationIsRunning.current = true;
        moveHeight(rowKey).start(() => {
            setNewData(rowKey)
            animationIsRunning.current = false;
        });
        };

        const renderItem = data => (
            
            <Animated.View
                style={[
                    styles.rowFrontContainer,
                    {
                        height: rowTranslateAnimatedValues[
                            data.item.key
                        ].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 50],
                        }),
                    },
                ]}
            >
            <TouchableHighlight
                onPress={() => console.log('You touched me',rowTranslateAnimatedValues[
                    data.item.key
                ].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 50],
                }) )}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View>
                    <Text>I am {data.item.text} in a SwipeListView</Text>
                </View>
            </TouchableHighlight>
        </Animated.View>
    );

    // const renderHiddenItem = () => (
    //     <View style={styles.rowBack}>
    //         <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
    //             <Text style={styles.backTextWhite}>Delete</Text>
    //         </View>
    //     </View>
    // );

        const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <SwipeListView
                disableRightSwipe
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={isOpen}
                onSwipeValueChange={onSwipeValueChange}
                useNativeDriver={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
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