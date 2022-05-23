import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { HiddenEditAndDelete, ScheduleCard } from 'components';
import { useSwipeList } from 'hooks';
import { IScheduleProps } from 'types';
import { WINDOW_WIDTH } from 'styles';
import * as S from './style';

interface ISwipeContentProps {
  data: IScheduleProps[];
  selectedDay: string;
  onDeleteTarget: (id: number) => Promise<void>;
  onEditTarget: (item: IScheduleProps) => void;
}

export const SwipeContent = ({
  data,
  onDeleteTarget,
  onEditTarget,
  selectedDay,
}: ISwipeContentProps) => {
  const { deleteRow } = useSwipeList({
    listData: data,
    rowBackValue: WINDOW_WIDTH * 0.3,
    onDeleteTarget,
  });

  const renderItem = ({ item }: any) => (
    <S.Container>
      <ScheduleCard key={item.key} schedule={item} selectedDay={selectedDay} />
    </S.Container>
  );

  return (
    <SwipeListView
      disableRightSwipe
      data={data}
      rightOpenValue={-WINDOW_WIDTH * 0.3}
      renderItem={renderItem}
      scrollEnabled={false}
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
