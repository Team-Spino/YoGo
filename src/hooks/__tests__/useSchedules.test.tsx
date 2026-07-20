import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { scheduleStore } from 'stores';

const mockInitScheduleTable = jest.fn();
const mockFindSchedulesByDay = jest.fn();
const mockFindScheduleDays = jest.fn();
const mockRemoveSchedule = jest.fn();

jest.mock('db', () => ({
  initScheduleTable: (...a: unknown[]) => mockInitScheduleTable(...a),
  findSchedulesByDay: (...a: unknown[]) => mockFindSchedulesByDay(...a),
  findScheduleDays: (...a: unknown[]) => mockFindScheduleDays(...a),
  removeSchedule: (...a: unknown[]) => mockRemoveSchedule(...a),
}));

const mockDeleteAllNotification = jest.fn();

jest.mock('hooks/useNotification', () => ({
  useNotification: () => ({ deleteAllNotification: mockDeleteAllNotification }),
}));

import { useSchedules } from '../useSchedules';

type Schedules = ReturnType<typeof useSchedules>;

const flush = () => act(async () => {});

const scheduleRow = (key: number, title: string) => ({
  key,
  TITLE: title,
  DESCRIPTION: '',
  TAG_COLOR: '#B5B5B9',
  TARGET_TIME: '09:00',
  TARGET_CITY: 'Asia/Seoul',
  TARGET_DAY: '2024-01-15',
  CUR_TIME: '09:00',
  CUR_CITY: 'UTC',
  CUR_DAY: '2024-01-15',
  DAY_OF_WEEK: '[]',
  IS_ACTIVE: 1,
});

const trees: Array<renderer.ReactTestRenderer> = [];

const renderUseSchedules = async (day = '2024-01-15') => {
  const results: Array<Schedules> = [];

  const Probe = () => {
    results.push(useSchedules(day));

    return null;
  };

  await act(async () => {
    trees.push(renderer.create(<Probe />));
  });
  await flush();

  return () => results[results.length - 1];
};

describe('useSchedules', () => {
  beforeEach(() => {
    mockInitScheduleTable.mockReset().mockResolvedValue(undefined);
    mockFindSchedulesByDay.mockReset().mockResolvedValue([]);
    mockFindScheduleDays.mockReset().mockResolvedValue([]);
    mockRemoveSchedule.mockReset().mockResolvedValue(undefined);
    mockDeleteAllNotification.mockReset();
  });

  // 스토어 구독이 다음 테스트로 새지 않도록 트리를 정리합니다.
  afterEach(() => {
    act(() => {
      trees.forEach(tree => tree.unmount());
    });
    trees.length = 0;
  });

  it('makes the table and loads the day’s schedules on mount', async () => {
    mockFindSchedulesByDay.mockResolvedValue([scheduleRow(1, 'Standup')]);

    const latest = await renderUseSchedules('2024-01-15');

    expect(mockInitScheduleTable).toHaveBeenCalledTimes(1);
    // 2024-01-15 is a Monday.
    expect(mockFindSchedulesByDay).toHaveBeenCalledWith('Mon', '2024-01-15');
    expect(latest().schedules).toHaveLength(1);
  });

  it('marks the days that have schedules', async () => {
    mockFindScheduleDays.mockResolvedValue([
      { result: '2024-01-15' },
      { result: '2024-02-20' },
    ]);

    const latest = await renderUseSchedules();

    expect(latest().markedDates['2024-01-15']).toEqual({ marked: true });
    expect(latest().markedDates['2024-02-20']).toEqual({ marked: true });
  });

  it('reloads when something changes elsewhere', async () => {
    await renderUseSchedules();

    expect(mockFindSchedulesByDay).toHaveBeenCalledTimes(1);

    await act(async () => {
      scheduleStore.emitChanged();
    });
    await flush();

    expect(mockFindSchedulesByDay).toHaveBeenCalledTimes(2);
  });

  it('removes a schedule and clears its notifications', async () => {
    mockFindSchedulesByDay.mockResolvedValue([
      scheduleRow(1, 'A'),
      scheduleRow(2, 'B'),
    ]);
    const latest = await renderUseSchedules();

    await act(async () => {
      await latest().removeSchedule(1);
    });

    expect(mockRemoveSchedule).toHaveBeenCalledWith(1);
    expect(mockDeleteAllNotification).toHaveBeenCalledWith({ number: 1 });
    expect(latest().schedules.map(s => s.key)).toEqual([2]);
  });
});
