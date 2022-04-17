import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import * as S from './style';
interface BTargetListProps {
  targetList: any ;
  size: number;
}


export function SelectTargetList({ targetList, size }: BTargetListProps) {
  
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item } : {item: any}) => {

    const backgroundColor = item.id === selectedId ? "#6564CC" : "#ffffff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <TouchableOpacity  onPress={() => setSelectedId(item.id)}>
      <S.ListBox>
          <S.List size={18}  style= {{ backgroundColor, color }}>
        {item.name}</S.List>
          </S.ListBox>
          </TouchableOpacity>
    );
  };

  return (
    <S.Container
    data={targetList}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    onEndReachedThreshold={0.8}
  />
  );
}
