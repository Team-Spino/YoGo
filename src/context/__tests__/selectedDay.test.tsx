import React, { useContext } from 'react';
import renderer, { act } from 'react-test-renderer';
import dayjs from 'dayjs';
import { SelectedDayContext, SelectedDayProvider } from '../selectedDay';

type SelectedDayValue = React.ContextType<typeof SelectedDayContext>;

const renderProvider = () => {
  const values: Array<SelectedDayValue> = [];

  const Probe = () => {
    values.push(useContext(SelectedDayContext));

    return null;
  };

  let tree: renderer.ReactTestRenderer;

  act(() => {
    tree = renderer.create(
      <SelectedDayProvider>
        <Probe />
      </SelectedDayProvider>,
    );
  });

  return {
    values,
    rerender: () => {
      act(() => {
        tree.update(
          <SelectedDayProvider>
            <Probe />
          </SelectedDayProvider>,
        );
      });
    },
  };
};

describe('SelectedDayProvider', () => {
  it('starts on today', () => {
    const { values } = renderProvider();

    expect(values[0].selectedDay).toBe(dayjs().format('YYYY-MM-DD'));
  });

  it('moves to the day that was picked', () => {
    const { values } = renderProvider();

    act(() => {
      values[0].setSelectedDay('2024-01-15');
    });

    expect(values[values.length - 1].selectedDay).toBe('2024-01-15');
  });

  it('keeps setSelectedDay stable across re-renders', () => {
    const { values, rerender } = renderProvider();

    rerender();

    expect(values[values.length - 1].setSelectedDay).toBe(
      values[0].setSelectedDay,
    );
  });

  it('hands out the same value when nothing changed', () => {
    const { values, rerender } = renderProvider();

    rerender();

    expect(values[values.length - 1]).toBe(values[0]);
  });
});
