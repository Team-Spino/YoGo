import React from 'react';
import { SwipeRow } from 'react-native-swipe-list-view';
import uuid from 'react-native-uuid';
import { HiddenEditAndDelete, ScheduleCard } from 'components';
import { useSwipeList } from 'hooks';
import { IScheduleProps } from 'types';
import { WINDOW_WIDTH } from 'styles';
import * as S from './style';

interface ISwipeContentProps {
  data: IScheduleProps[];
  onDeleteTarget: (id: number) => Promise<void>;
  onEditTarget: (item: IScheduleProps) => void;
}

export const SwipeContent = ({data,  onDeleteTarget, onEditTarget } : ISwipeContentProps) => {

  const {deleteRow} = useSwipeList({listData : data , rowBackValue: WINDOW_WIDTH*0.3, onDeleteTarget});
  
 
  return (
  <S.Inner>
      {data.map((schedule: IScheduleProps, idx : number) => (
          <S.Container key={idx}>
            <SwipeRow
                  disableRightSwipe
                  rightOpenValue={-WINDOW_WIDTH * 0.3}
                >
                  <HiddenEditAndDelete
                  item={schedule}
                  onPressDelete={deleteRow}
                  onPressEdit={onEditTarget}
                  />
                  <ScheduleCard key={uuid.v4()} schedule={schedule} />
                </SwipeRow> 
                </S.Container>
      ))}
      </S.Inner>
  );
};
