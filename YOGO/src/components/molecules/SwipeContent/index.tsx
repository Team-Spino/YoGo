import React from 'react';
import { SwipeRow } from 'react-native-swipe-list-view';
import uuid from 'react-native-uuid';
import { HiddenEditAndDelete, ScheduleCard } from 'components';
import { useSwipeList } from 'hooks';
import { IScheduleProps } from 'types';
import * as S from './style';

export const SwipeContent = ({data,  onDeleteTarget}) => {
  const {rowTranslateAnimatedValues, isOpen, onSwipeValueChange, deleteRow} = useSwipeList({listData : data , rowBackValue: '75', onDeleteTarget});

  return (
  <S.Inner>
      {data.map((schedule: IScheduleProps, idx : number) => (
          <S.Container key={idx}>
            <SwipeRow
                  disableRightSwipe
                  rightOpenValue={-140}
                >
                  <HiddenEditAndDelete
                  item={schedule}
                  onPress={deleteRow} />
                  <ScheduleCard key={uuid.v4()} schedule={schedule} />
                </SwipeRow> 
                </S.Container>
      ))}
      </S.Inner>
  );
};
