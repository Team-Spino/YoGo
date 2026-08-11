import { useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ISwipeDataProps } from 'types';

interface IrowTranslateAnimatedValuesType {
  [key: string]: Animated.Value;
}

interface IuseSwipeListProps {
  listData: any;
  rowBackValue: string | number;
  onDeleteTarget: (id: number) => Promise<void>;
}

/**
 * useSwipeList
 *
 * @param listData 리스트의 데이터로 {key: string | number[], text: string, ... 이후에는 상관없음 key가 필요} 형태로 넣어줘야한다. => onSwipeValueChange에서wipeData로 들어갈것
 * @param setListData 리스트 데이터를 업데이트 해줄 함수
 * @returns
 */
export function useSwipeList({
  listData,
  rowBackValue,
  onDeleteTarget,
}: IuseSwipeListProps) {
  /**
   * key 값마다 animated value를 하나씩 두고 리렌더 사이에 유지합니다.
   *
   * 매 렌더 새로 만들면 진행 중이던 스와이프 애니메이션이 처음으로 되돌아갑니다.
   */
  const rowTranslateAnimatedValues =
    useRef<IrowTranslateAnimatedValuesType>({}).current;

  listData?.forEach(({ key }: { key: string }) => {
    if (!rowTranslateAnimatedValues[`${key}`]) {
      rowTranslateAnimatedValues[`${key}`] = new Animated.Value(1);
    }
  });

  /**
   * rightOpenValue를 설정합니다. 기본값으로 뒷에 있는 (delete) 크기만큼 열수 있게 합니다, 이후 swipe을 끝부분까지하면, 완전히 열리게 합니다
   */
  const [isOpen, setIsOpen] = useState(-rowBackValue);

  const animationIsRunning = useRef(false);

  /**
   * moveHeight
   *
   * 주어진 key에 맞는 애니메이션 객체의 value를 변경합니다
   *
   * @param key 리스트의 key값
   * @returns Animated.timing함수를 반환
   */
  const moveHeight = (key: string) => {
    return Animated.timing(rowTranslateAnimatedValues[key], {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    });
  };

  /**
   * setNewData
   * 키값의 인덱스를 구해 해당 인덱스를 제거합니다
   * 제거된 리스트를 새로운 리스트로 업데이트 합니다
   *
   * @param key 리스트의 키값
   */

  const setNewData = async (key: string) => {
    onDeleteTarget(Number(key));
    setIsOpen(-rowBackValue);
  };

  /**
   * onSwipeValueChange
   *
   * swipe를 할때 발생하는 이벤트 입니다
   * swipe를 왼쩍기준 오른쪽으로 150 이상이 되면, 완전히 열리게 만듭니다
   * 그전이라면 기본 값으로 변경됩니다
   *
   * @param swipeData
   */

  const onSwipeValueChange = (swipeData: ISwipeDataProps) => {
    const { key, value } = swipeData;

    if (
      value - 150 > -Dimensions.get('window').width &&
      isOpen != -rowBackValue
    ) {
      setIsOpen(-rowBackValue);
    }

    if (value - 150 < -Dimensions.get('window').width) {
      setIsOpen(-Dimensions.get('window').width);
    }

    if (
      value < -Dimensions.get('window').width &&
      !animationIsRunning.current
    ) {
      animationIsRunning.current = true;
      moveHeight(String(key)).start(() => {
        setNewData(String(key));
        animationIsRunning.current = false;
      });
    }
  };

  /**
   * deleteRow
   *
   * siwpe가 아닌 delete를 눌러 삭제했을때 발생하는 이벤트 입니다
   * front의 상자를 제거하고, 데이터를 업데이트 합니다
   *
   * @param rowKey
   */

  const deleteRow = (rowKey: string | number) => {
    setNewData(String(rowKey));
  };

  return { rowTranslateAnimatedValues, isOpen, onSwipeValueChange, deleteRow };
}
