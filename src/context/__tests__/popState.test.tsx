import React, { useContext } from 'react';
import renderer, { act } from 'react-test-renderer';
import { PopContext, PopProvider } from '../popState';

type PopValue = React.ContextType<typeof PopContext>;

const renderPopProvider = () => {
  const values: Array<PopValue> = [];

  const Probe = () => {
    values.push(useContext(PopContext));

    return null;
  };

  let tree: renderer.ReactTestRenderer;

  act(() => {
    tree = renderer.create(
      <PopProvider>
        <Probe />
      </PopProvider>,
    );
  });

  return {
    values,
    rerender: () => {
      act(() => {
        tree.update(
          <PopProvider>
            <Probe />
          </PopProvider>,
        );
      });
    },
  };
};

describe('PopProvider', () => {
  it('hands out the same value when it re-renders with unchanged state', () => {
    const { values, rerender } = renderPopProvider();

    rerender();

    expect(values[values.length - 1]).toBe(values[0]);
  });

  it('keeps setPop stable across re-renders', () => {
    const { values, rerender } = renderPopProvider();

    rerender();

    expect(values[values.length - 1].setPop).toBe(values[0].setPop);
  });

  it('hands out a new value once the state actually changes', () => {
    const { values } = renderPopProvider();

    act(() => {
      values[0].setPop(true);
    });

    const latest = values[values.length - 1];

    expect(latest.isPoped).toBe(true);
    expect(latest).not.toBe(values[0]);
  });
});
