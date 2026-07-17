import React from 'react';
import { Animated } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { useSwipeList } from '../useSwipeList';

type SwipeList = ReturnType<typeof useSwipeList>;

/**
 * 훅을 렌더 트리 안에서 돌려, 리렌더 사이에 값이 유지되는지 봅니다.
 */
const renderUseSwipeList = (listData: Array<{ key: string }>) => {
  const results: Array<SwipeList> = [];

  const Probe = ({ data }: { data: Array<{ key: string }> }) => {
    results.push(
      useSwipeList({
        listData: data,
        rowBackValue: 100,
        onDeleteTarget: async () => {},
      }),
    );

    return null;
  };

  let tree: renderer.ReactTestRenderer;

  act(() => {
    tree = renderer.create(<Probe data={listData} />);
  });

  return {
    results,
    rerender: (next: Array<{ key: string }>) => {
      act(() => {
        tree.update(<Probe data={next} />);
      });
    },
  };
};

describe('useSwipeList', () => {
  it('keeps the same animated value for a row across re-renders', () => {
    const listData = [{ key: '1' }, { key: '2' }];

    const { results, rerender } = renderUseSwipeList(listData);

    const before = results[0].rowTranslateAnimatedValues['1'];

    rerender(listData);

    const after = results[results.length - 1].rowTranslateAnimatedValues['1'];

    expect(after).toBe(before);
  });

  it('keeps a row animation mid-flight when another render happens', () => {
    const listData = [{ key: '1' }];

    const { results, rerender } = renderUseSwipeList(listData);

    const value = results[0].rowTranslateAnimatedValues['1'];
    value.setValue(0.5);

    rerender(listData);

    const after = results[results.length - 1].rowTranslateAnimatedValues['1'];

    expect(after).toBeInstanceOf(Animated.Value);
    // @ts-expect-error - 테스트에서 현재 값을 들여다봅니다.
    expect(after._value).toBe(0.5);
  });

  it('makes an animated value for a row added later', () => {
    const { results, rerender } = renderUseSwipeList([{ key: '1' }]);

    rerender([{ key: '1' }, { key: '2' }]);

    const values = results[results.length - 1].rowTranslateAnimatedValues;

    expect(values['2']).toBeInstanceOf(Animated.Value);
  });
});
