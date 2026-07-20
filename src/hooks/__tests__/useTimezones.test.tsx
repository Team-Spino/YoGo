import React from 'react';
import renderer, { act } from 'react-test-renderer';

const mockInitTimezoneTable = jest.fn();
const mockFindTimezones = jest.fn();
const mockAddTimezone = jest.fn();
const mockRemoveTimezone = jest.fn();

jest.mock('db', () => ({
  initTimezoneTable: (...a: unknown[]) => mockInitTimezoneTable(...a),
  findTimezones: (...a: unknown[]) => mockFindTimezones(...a),
  addTimezone: (...a: unknown[]) => mockAddTimezone(...a),
  removeTimezone: (...a: unknown[]) => mockRemoveTimezone(...a),
}));

import { useTimezones } from '../useTimezones';

type Timezones = ReturnType<typeof useTimezones>;

const flush = () => act(async () => {});

const renderUseTimezones = async () => {
  const results: Array<Timezones> = [];

  const Probe = () => {
    results.push(useTimezones());

    return null;
  };

  await act(async () => {
    renderer.create(<Probe />);
  });
  await flush();

  return () => results[results.length - 1];
};

describe('useTimezones', () => {
  beforeEach(() => {
    mockInitTimezoneTable.mockReset().mockResolvedValue(undefined);
    mockFindTimezones.mockReset().mockResolvedValue([]);
    mockAddTimezone.mockReset().mockResolvedValue(1);
    mockRemoveTimezone.mockReset().mockResolvedValue(undefined);
  });

  it('makes the table and loads saved cities on mount', async () => {
    mockFindTimezones.mockResolvedValue([
      { key: 1, CITY: 'Asia/Seoul' },
      { key: 2, CITY: 'America/New_York' },
    ]);

    const latest = await renderUseTimezones();

    expect(mockInitTimezoneTable).toHaveBeenCalledTimes(1);
    expect(latest().timezones).toHaveLength(2);
    expect(latest().timezones[0].CITY).toBe('Asia/Seoul');
  });

  it('adds a city and shows it right away', async () => {
    const latest = await renderUseTimezones();

    // 넣은 뒤 DB에서 다시 읽어 진짜 key로 목록을 채웁니다.
    // 삭제가 key로 동작하므로 낙관적 추정 key가 아니라 저장된 rowid를 씁니다.
    mockFindTimezones.mockResolvedValue([{ key: 7, CITY: 'Asia/Tokyo' }]);

    await act(async () => {
      await latest().addTimezone('Asia/Tokyo');
    });

    expect(mockAddTimezone).toHaveBeenCalledWith('Asia/Tokyo');
    expect(latest().timezones).toEqual([{ key: 7, CITY: 'Asia/Tokyo' }]);
  });

  it('removes a city by key', async () => {
    mockFindTimezones.mockResolvedValue([
      { key: 1, CITY: 'Asia/Seoul' },
      { key: 2, CITY: 'America/New_York' },
    ]);
    const latest = await renderUseTimezones();

    await act(async () => {
      await latest().removeTimezone(1);
    });

    expect(mockRemoveTimezone).toHaveBeenCalledWith(1);
    expect(latest().timezones).toEqual([
      { key: 2, CITY: 'America/New_York' },
    ]);
  });
});
