import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as S from './style';

export function TagFilter() {
  return (
    <S.Container style={styles.containerStyle}>
      <View>
        <Text>전체</Text>
      </View>
      <View>
        <Text>전체</Text>
      </View>
      <View>
        <Text>전체</Text>
      </View>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
