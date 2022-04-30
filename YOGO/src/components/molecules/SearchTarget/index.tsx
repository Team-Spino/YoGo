import React, { useState } from 'react';
import { TargetCity, SelectTargetInput } from 'components';
import * as S from './style';

interface IBTargetListProps {
  targetList: any;
  text: string;
  onChangeText: (text: string) => void;
  onSubmitText: (text: string) => void;
}

interface IBTTargetItemProps {
  id: number;
  city: string;
}

export function SearchTarget({
  targetList,
  text,
  onChangeText,
  onSubmitText,
}: IBTargetListProps) {
  const [selectedId, setSelectedId] = useState<number>(-1);

  const onPress = ({ id, city }: IBTTargetItemProps) => {
    onSubmitText(city);
    setSelectedId(id);
  };

  return (
    <S.Container>
      <SelectTargetInput
        text={text}
        onChangeText={onChangeText}
      ></SelectTargetInput>
      <S.FlatListContainer
        data={targetList}
        renderItem={({ item }) => (
          <TargetCity item={item} onPress={onPress} selectedId={selectedId} />
        )}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.8}
      />
    </S.Container>
  );
}
