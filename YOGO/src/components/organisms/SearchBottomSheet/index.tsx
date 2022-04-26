import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
} from 'react-native';
import { SearchTarget, SelectTargetCityBtn } from 'components';
import * as S from './style';

interface ISearchBSProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
  }

  // mearge후에 상권님이 만든 dummydata에 추가하고 지울 예정
const dummyData = [
    { id: 1, city: 'Tokyo' },
    { id: 2, city: 'Osaka' },
    { id: 3, city: 'Kyoto' },
    { id: 4, city: 'Hokkaido' },
    { id: 5, city: 'Sapporo' },
    { id: 6, city: 'Fukuoka' },
    { id: 7, city: 'Kumamoto' },
    { id: 8, city: 'Okinawa' },
    { id: 9, city: 'Kagoshima' },
    { id: 10, city: 'Saitama' },
    { id: 11, city: 'Chiba' },
    { id: 12, city: 'Kanagawa' },
    { id: 13, city: 'Aichi' },
    { id: 14, city: 'Miyazaki' },
    { id: 15, city: 'Nagoya' },
    { id: 16, city: 'Fukushima' },
    { id: 17, city: 'Gifu' },
    { id: 18, city: 'Shizuoka' },
  ]
  

export const SearchBottomSheet = ({ modalVisible, setModalVisible} : ISearchBSProps) => {


    const [text, setText] = useState("");
    const [selectedSearchTargetCity , setSelectedSearchTargetCity] = useState<boolean>(false);
    const targetList = dummyData.filter((item) => item.city.toUpperCase().includes(text.toUpperCase()));
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;

    const onChangeText = (text:string) => {
        setText(text);
      }
    
    const onPressSearchTargetCity = () => {
        setSelectedSearchTargetCity(!selectedSearchTargetCity);
    }
      
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(modalVisible) {
            resetBottomSheet.start();
        }
    }, [modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setModalVisible(false);
            setSelectedSearchTargetCity(false);
        })
    }

    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <S.Overlay>
                <TouchableWithoutFeedback
                    onPress={closeModal}>
                <S.Background/>
                </TouchableWithoutFeedback>
                <S.Container style={{transform: [{ translateY: translateY }]}} {...panResponders.panHandlers}>
                { ! selectedSearchTargetCity && 
                <>
                    <SelectTargetCityBtn onPress={()=>onPressSearchTargetCity()} text={'뉴욕, 서울'}/>
                        
                </>
                }
                { selectedSearchTargetCity && 
                <>
                <SearchTarget targetList={targetList} text={text}  onChangeText= {onChangeText}/>
                </>}
                </S.Container>
            </S.Overlay>
        </Modal>
    )
}
