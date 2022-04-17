import React from 'react';
import { FlatList, Text, View } from 'react-native';
import * as S from './style';
interface BTargetListProps {
  targetList: string[] ;
  size: number;
}

const renderItem = ({ item } : {item: string}) => {
  return (
    <View>
      <View>
        <Text>{item}</Text>
      </View>
    </View>
  );
};

export function SelectTargetList({ targetList, size }: BTargetListProps) {
  return (
    <FlatList
    data={targetList}
    renderItem={renderItem}
    onEndReachedThreshold={0.8}
  />
  );
}
