import React from "react";
import { Text, View, StyleSheet ,Pressable, Platform } from "react-native";
import { IconSearch } from "../../../assets/icons/IconSearch";
import * as S from './style'

export const FloatingButton = () => {
    return (
        <View style={styles.wrapper}>
          <Pressable
            style={({pressed}) => [
              styles.button,
              Platform.OS === 'ios' && {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            android_ripple={{color: 'white'}}>
            <IconSearch />
          </Pressable>
        </View>
      );
    }
const styles = StyleSheet.create({
    wrapper: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      width: 56,
      height: 56,
      borderRadius: 28,
      // iOS 전용 그림자 설정
      shadowColor: '#4d4d4d',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      // 안드로이드 전용 그림자 설정
      elevation: 5,
      // 안드로이드에서 물결 효과가 영역 밖으로 나가지 않도록 설정
      // iOS에서는 overflow가 hidden일 경우 그림자가 보여지지 않음
      overflow: Platform.select({android: 'hidden'}),
    },
    button: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#A3BFE3',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });