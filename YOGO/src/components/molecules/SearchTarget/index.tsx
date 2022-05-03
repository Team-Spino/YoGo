import React, { useState } from 'react';
import { TargetCity, SelectTargetInput } from 'components';
import * as S from './style';

interface IBTargetListProps {
  targetList: any;
  city: string;
  onChangeCity: (city: string) => void;
  onSubmitCity: (city: string) => void;
}
interface IBTTargetItemProps {
  id: number;
  city: string;
}

export function SearchTarget({
  targetList,
  city,
  onChangeCity,
  onSubmitCity,
}: IBTargetListProps) {
  const [selectedId, setSelectedId] = useState<number>(-1);

  const onPress = ({ id, city }: IBTTargetItemProps) => {
    onSubmitCity(city);
    setSelectedId(id);
  };

  return (
    <S.Container>
      <SelectTargetInput
        city={city}
        onChangeCity={onChangeCity}
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
