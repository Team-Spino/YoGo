import React, { useContext } from 'react';
import renderer, { act } from 'react-test-renderer';

const mockGetBoolean = jest.fn();
const mockSet = jest.fn();

jest.mock('utils/mmkv', () => ({
  storage: {
    getBoolean: (key: string) => mockGetBoolean(key),
    set: (key: string, value: boolean) => mockSet(key, value),
  },
}));

import { FirstLaunchContext, FirstLaunchProvider } from '../firstLaunch';

type FirstLaunchValue = React.ContextType<typeof FirstLaunchContext>;

const renderFirstLaunchProvider = () => {
  const values: Array<FirstLaunchValue> = [];

  const Probe = () => {
    values.push(useContext(FirstLaunchContext));

    return null;
  };

  let tree: renderer.ReactTestRenderer;

  act(() => {
    tree = renderer.create(
      <FirstLaunchProvider>
        <Probe />
      </FirstLaunchProvider>,
    );
  });

  return {
    values,
    rerender: () => {
      act(() => {
        tree.update(
          <FirstLaunchProvider>
            <Probe />
          </FirstLaunchProvider>,
        );
      });
    },
  };
};

describe('FirstLaunchProvider', () => {
  beforeEach(() => {
    mockGetBoolean.mockReset();
    mockSet.mockReset();
  });

  it('treats a device with nothing stored as a first launch', () => {
    mockGetBoolean.mockReturnValue(undefined);

    const { values } = renderFirstLaunchProvider();

    expect(values[0].isFirstLaunch).toBe(true);
  });

  it('treats a device that finished onboarding as a later launch', () => {
    mockGetBoolean.mockReturnValue(false);

    const { values } = renderFirstLaunchProvider();

    expect(values[0].isFirstLaunch).toBe(false);
  });

  it('reads storage once instead of on every render', () => {
    mockGetBoolean.mockReturnValue(undefined);

    const { rerender } = renderFirstLaunchProvider();

    rerender();
    rerender();

    expect(mockGetBoolean).toHaveBeenCalledTimes(1);
  });

  it('hands out the same value when it re-renders with unchanged state', () => {
    mockGetBoolean.mockReturnValue(undefined);

    const { values, rerender } = renderFirstLaunchProvider();

    rerender();

    expect(values[values.length - 1]).toBe(values[0]);
  });

  it('remembers onboarding is done and stops reporting a first launch', () => {
    mockGetBoolean.mockReturnValue(undefined);

    const { values } = renderFirstLaunchProvider();

    act(() => {
      values[0].checkFirstLaunch();
    });

    expect(mockSet).toHaveBeenCalledWith('FIRST_LAUNCH', false);
    expect(values[values.length - 1].isFirstLaunch).toBe(false);
  });
});
