import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { View } from '@tamagui/core';
import { TargetCity, SelectTargetInput } from 'components';

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
    <View
      width="100%"
      height="100%"
      justifyContent="flex-start"
      alignItems="center"
      paddingHorizontal={20}
      paddingTop={12}
    >
      <SelectTargetInput
        city={city}
        onChangeCity={onChangeCity}
      ></SelectTargetInput>
      <FlatList
        style={{ width: '100%' }}
        data={targetList}
        renderItem={({ item }) => (
          <TargetCity item={item} onPress={onPress} selectedId={selectedId} />
        )}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.8}
      />
    </View>
  );
}
