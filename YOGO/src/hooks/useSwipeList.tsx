import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

/**
 * 
 * @param listData 리스트의 데이터로 {key: string, text: string, ... 이후에는 상권없음 key가 필요} 형태로 넣어줘야한다. => onSwipeValueChange에서wipeData로 들어갈것
 * @param setListData 리스트 데이터를 업데이트 해줄 함수
 * @returns 
 */

export function useSwipeList( listData, setListData) {
  
    /**
     * 해당하는 key 값에 맞는 animated.vlaue를 만듭니다.
     */
    const rowTranslateAnimatedValues = {};
    listData
        .forEach( ({key, text}) => {
            rowTranslateAnimatedValues[`${key}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);
    
        const onSwipeValueChange = (swipeData: { key: any; value: any; }) => {
            const { key, value } = swipeData;
            if (
                value < -Dimensions.get('window').width &&
                !animationIsRunning.current
            ) {
                animationIsRunning.current = true;
                Animated.timing(rowTranslateAnimatedValues[key], {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }).start(() => {
                    const newData = [...listData];
                    const prevIndex = listData.findIndex(item => item.key === key); // 같은키를 찾아서
                    newData.splice(prevIndex, 1); // 해당 키만 잘라냄
                    setListData(newData); // 잘라냄 키를 다시 setList로
                    animationIsRunning.current = false;
                });
            }
        };
    
        // 어차피 데이터가 들어갈꺼니깐 ㄱㅊ을듯
        // 그러고 랜더를 해주면된다
        // 반환되어서 사용되는 값음, onSwipeValueChange 을 반환하면된다
        return (
            <View style={styles.container}>
                <SwipeListView
                    disableRightSwipe
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
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