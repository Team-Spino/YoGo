import React, { Dispatch, SetStateAction } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TimeZoneCard, HiddenDelete, RenderEmptyData } from 'components';
import { useSwipeList } from 'hooks';
import { WINDOW_WIDTH } from 'styles';
import { ICityProps } from 'types';
import { Dimensions } from 'react-native';
import * as S from './style';

interface IItemProps {
  key: number;
  CITY: string;
}

interface ITimeZoneListProps {
  cardState: Array<ICityProps>;
  setCardState: Dispatch<SetStateAction<Array<ICityProps>>>;
  onDeleteTarget: (id: number) => Promise<void>;
}

export function TimeZoneList({
  cardState,
  onDeleteTarget,
}: ITimeZoneListProps) {
  const { rowTranslateAnimatedValues, isOpen, onSwipeValueChange, deleteRow } =
    useSwipeList({
      listData: cardState,
      rowBackValue: WINDOW_WIDTH * 0.15,
      onDeleteTarget,
    });

  const renderItem = ({ item }: { item: IItemProps }) => {
    return (
      <Animated.View
        style={[
          {
            height: rowTranslateAnimatedValues[item.key].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 70],
            }),
          },
        ]}
      >
        <TimeZoneCard key={item?.key} location={item?.CITY} />
      </Animated.View>
    );
  };
  return (
     <S.Container>
        {cardState.length > 0 && (
            <SwipeListView
            disableRightSwipe
            data={cardState}
            renderItem={renderItem}
            renderHiddenItem={({item})=> <HiddenDelete item={item} onPress={deleteRow}/>}
            rightOpenValue={isOpen}
            onSwipeValueChange={onSwipeValueChange}
            useNativeDriver={false}
        />
        )    
        }
        {cardState.length === 0 && <RenderEmptyData text={'No Time List!'}/>}
    </S.Container>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height * 0.8,
  },
});
