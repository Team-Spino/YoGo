import { useRef, useEffect } from 'react';
import { Dimensions, Animated, PanResponder } from 'react-native';

interface IUseBottomSheetProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setResult?: (visible: boolean) => void;
}

export function useBottomSheet({
  modalVisible,
  setModalVisible,
  setResult
}: IUseBottomSheetProps) {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  // onClosed는 시트가 완전히 닫힌(모달 unmount) 뒤에 실행됩니다. 시트를 닫으면서
  // 곧바로 navigation.push를 하면, 투명 Modal이 아직 화면 위에 남아 새 화면의
  // 터치를 막아 "멈춘 것처럼" 보입니다. 그래서 닫힘 콜백 이후에 화면 전환합니다.
  const closeBottomSheet = (onClosed?: () => void) => {
    moveBottomSheet({ value: screenHeight }).start(() => {
      setModalVisible(false);
      if (setResult) setResult(false);
      if (onClosed) onClosed();
    });
  };

  const moveBottomSheet = ({ value }: { value: number }) =>
    Animated.timing(panY, {
      toValue: value,
      duration: 300,
      useNativeDriver: true,
    });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeBottomSheet();
        } else {
          moveBottomSheet({ value: 0 }).start();
        }
      },
    }),
    
  ).current;

  useEffect(() => {
    if (modalVisible) moveBottomSheet({ value: 0 }).start();
  }, [modalVisible]);

  return { translateY, screenHeight, panResponders, closeBottomSheet };
}
