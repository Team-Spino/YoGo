import React, { Dispatch, SetStateAction } from 'react';
import { Animated} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TimeZoneCard } from 'components';
import { useSwipeList } from 'hooks';
import * as S from './style';

interface ITimeZoneListProps {
    cardState: [ { key :string, location: string } ] | never[];
    setCardState: Dispatch<SetStateAction<string[]>> | Dispatch<SetStateAction<never[]>> ;
}

export function TimeZoneList({cardState, setCardState}: ITimeZoneListProps) {

  const {rowTranslateAnimatedValues, isOpen, onSwipeValueChange, deleteRow} = useSwipeList({listData : cardState, setListData: setCardState , rowBackValue: '75'});

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
      <TimeZoneCard key={item.key} location={item.location} />
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
