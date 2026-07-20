import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View } from '@tamagui/core';
import { HiddenEditAndDelete, ScheduleCard } from 'components';
import { useSwipeList } from 'hooks';
import { IScheduleProps } from 'types';
import { WINDOW_WIDTH } from 'styles';

interface ISwipeContentProps {
  data: IScheduleProps[];
  onDeleteTarget: (id: number) => Promise<void>;
  onEditTarget: (item: IScheduleProps) => void;
}
export const SwipeContent = ({
  data,
  onDeleteTarget,
  onEditTarget,
}: ISwipeContentProps) => {
  const { deleteRow } = useSwipeList({
    listData: data,
    rowBackValue: WINDOW_WIDTH * 0.3,
    onDeleteTarget,
  });

  const renderItem = ({ item, index }: any) => (
    <View key={index} width="100%" height={106}>
      <ScheduleCard schedule={item} />
    </View>
  );

  return (
    <SwipeListView
      recalculateHiddenLayout={true}
      disableRightSwipe
      data={data}
      rightOpenValue={-WINDOW_WIDTH * 0.3}
      renderItem={renderItem}
      scrollEnabled={true}
      nestedScrollEnabled={false}
      renderHiddenItem={({ item }) => (
        <HiddenEditAndDelete
          item={item}
          onPressDelete={deleteRow}
          onPressEdit={onEditTarget}
        />
      )}
      style={{ marginBottom: 40 }}
    />
  );
};
