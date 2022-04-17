import React, { useEffect, useRef } from 'react';
import {
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder
} from 'react-native';
import { SelectTargetInput, SelectTargetList } from 'components';
import * as S from './style';
interface ISearchBSProps {
    targetList: string[];
    modalVisible: boolean;
    setModalVisible: (modalVisible : boolean) => boolean;
  }

export const SearchBottomSheet = ({targetList, modalVisible, setModalVisible} : ISearchBSProps) => {
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
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
                    onPress={closeModal}
                >
                    <S.Background/>
                </TouchableWithoutFeedback>
                <S.Container style={{transform: [{ translateY: translateY }]}} {...panResponders.panHandlers}>

                <>
                                {/* 나중에 molecules로 묶을것! */}
                <SelectTargetInput ></SelectTargetInput>
                <SelectTargetList targetList = {targetList} size ={10}></SelectTargetList>
               
                </>
                </S.Container>
            </S.Overlay>
        </Modal>
    )
}
