import React, { useState } from 'react';
import { TargetCity, SelectTargetInput } from 'components';
import * as S from './style';

interface IBTargetListProps {
  targetList: any ;
  text: string;
  onChangeText: (text:string) => void;
}


export function SearchTarget({ targetList, text, onChangeText }: IBTargetListProps) {
  const [selectedId, setSelectedId] = useState<number>(-1);
  return (
    <S.Container>
    <SelectTargetInput text={text} onChangeText={onChangeText} ></SelectTargetInput>
    <S.FlatListContainer
    data={targetList}
    renderItem={({item}) =><TargetCity item={item} onPress={(id: any) => setSelectedId(id)} selectedId={selectedId}/>}
    keyExtractor={(item) => item.id}
    onEndReachedThreshold={0.8}
  />
  </S.Container>
  );
}
