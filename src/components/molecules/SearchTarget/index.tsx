import React, { useState } from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
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
    <View width="100%" flex={1} paddingHorizontal={20} paddingTop={12}>
      <SelectTargetInput city={city} onChangeCity={onChangeCity} />
      {/* 시트 안에서 스크롤이 시트 제스처와 충돌하지 않도록 BottomSheetFlatList 사용 */}
      <BottomSheetFlatList
        style={{ width: '100%', flex: 1 }}
        data={targetList}
        renderItem={({ item }: { item: IBTTargetItemProps }) => (
          <TargetCity item={item} onPress={onPress} selectedId={selectedId} />
        )}
        keyExtractor={(item: IBTTargetItemProps) => String(item.id)}
        keyboardShouldPersistTaps="handled"
        onEndReachedThreshold={0.8}
      />
    </View>
  );
}
