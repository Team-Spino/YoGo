import React from 'react';
import { Animated } from 'react-native';
import { View } from '@tamagui/core';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TimeZoneCard, HiddenDelete, RenderEmptyData } from 'components';
import { useSwipeList } from 'hooks';
import { WINDOW_WIDTH } from 'styles';
import { ICityProps } from 'types';

interface IItemProps {
  key: number;
  CITY: string;
}

interface ITimeZoneListProps {
  cardState: Array<ICityProps>;
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
              outputRange: [0, 92],
            }),
          },
        ]}
      >
        <TimeZoneCard key={item?.key} location={item?.CITY} />
      </Animated.View>
    );
  };
  return (
     <View width="100%" flex={1} backgroundColor="$background">
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
        {cardState.length === 0 && (
          <RenderEmptyData
            text={'No time zones yet'}
            hint={'Tap + to add a city'}
          />
        )}
    </View>
  );
}
