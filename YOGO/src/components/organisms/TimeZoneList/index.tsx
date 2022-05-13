import React, { Dispatch, SetStateAction } from 'react';
import { Animated} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TimeZoneCard } from 'components';
import { useSwipeList } from 'hooks';
import { ICityProps } from 'types';
import * as S from './style';


interface ITimeZoneListProps {
    cardState: Array<ICityProps>
    setCardState: Dispatch<SetStateAction<Array<ICityProps>>> ;
    onDeleteTarget: (id: number) => Promise<void>
}

export function TimeZoneList({cardState, setCardState, onDeleteTarget}: ITimeZoneListProps) {


  const {rowTranslateAnimatedValues, isOpen, onSwipeValueChange, deleteRow} = useSwipeList({listData : cardState , rowBackValue: '75', onDeleteTarget});

  const renderItem = ({item} : any) => (
    <Animated.View
        style={[
            {
                height : rowTranslateAnimatedValues[
                    item.key
                ].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 70],
                }),
            },
        ]}
    >
      <TimeZoneCard key={item?.key} location={item?.CITY} />
  </Animated.View>
);

const renderHiddenItem = ({item}: any) => (
  <S.RenderHiddenContainer>
      <S.RenderRightButton
          onPress={() => deleteRow(item.key)}
      >
          <S.RenderRightButtonText>Delete</S.RenderRightButtonText>
          </S.RenderRightButton>
      </S.RenderHiddenContainer>
);


  return (
     <S.Container>
        <SwipeListView
            disableRightSwipe
            data={cardState}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={isOpen}
            onSwipeValueChange={onSwipeValueChange}
            useNativeDriver={false}
        />
    </S.Container>
  );
}
