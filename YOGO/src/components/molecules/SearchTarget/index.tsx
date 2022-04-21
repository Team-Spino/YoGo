import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { TargetCity, SelectTargetInput } from 'components';
import * as S from './style';
import { onChange } from 'react-native-reanimated';


interface BTargetListProps {
  targetList: any ;
  text: string;
  onChangeText: (text:string) => void;
}


export function SearchTarget({ targetList, text, onChangeText }: BTargetListProps) {
  const [selectedId, setSelectedId] = useState<number| null>(null);
  return (
    <>
    <SelectTargetInput text={text} onChangeText={onChangeText} ></SelectTargetInput>
    <S.Container
    data={targetList}
    renderItem={({item}) =><TargetCity item={item} onPress={(id: any) => setSelectedId(id)} selectedId={selectedId}/>}
    keyExtractor={(item) => item.id}
    onEndReachedThreshold={0.8}
  />
  </>
  );
}
