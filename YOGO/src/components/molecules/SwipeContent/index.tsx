import React from 'react';
import { SwipeRow } from 'react-native-swipe-list-view';
import uuid from 'react-native-uuid';
import { HiddenEditAndDelete, ScheduleCard } from 'components';
import { IScheduleProps } from 'types';
import * as S from './style';

export const SwipeContent = ({data}) => {
  return (
  <S.Inner>
      {data.map((schedule: IScheduleProps, idx : number) => (
          <S.Container key={uuid.v4()}>
            <SwipeRow
                  disableRightSwipe
                  rightOpenValue={-140}
                >
                  <HiddenEditAndDelete />
                  <ScheduleCard key={uuid.v4()} schedule={schedule} />
                </SwipeRow> 
                </S.Container>
      ))}
      </S.Inner>
  );
};
