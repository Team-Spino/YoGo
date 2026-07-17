import dayjs from 'dayjs';
import { getDatesForWeekdays, splitScheduleDays } from '../scheduleCalendar';

describe('splitScheduleDays', () => {
  it('reads a one-off schedule as a date', () => {
    const { dates, weekdays } = splitScheduleDays([{ result: '2024-01-15' }]);

    expect(dates).toEqual(['2024-01-15']);
    expect(weekdays).toEqual([]);
  });

  it('reads a repeating schedule as the days it repeats on', () => {
    const { dates, weekdays } = splitScheduleDays([
      { result: '["Mon","Wed"]' },
    ]);

    expect(dates).toEqual([]);
    expect(weekdays).toEqual(['Mon', 'Wed']);
  });

  it('keeps dates and repeat days apart when both are stored', () => {
    const { dates, weekdays } = splitScheduleDays([
      { result: '2024-01-15' },
      { result: '["Mon"]' },
      { result: '2024-02-20' },
    ]);

    expect(dates).toEqual(['2024-01-15', '2024-02-20']);
    expect(weekdays).toEqual(['Mon']);
  });

  it('names a repeat day once even when several schedules share it', () => {
    const { weekdays } = splitScheduleDays([
      { result: '["Mon","Wed"]' },
      { result: '["Mon"]' },
      { result: '["Mon","Fri"]' },
    ]);

    expect(weekdays).toEqual(['Mon', 'Wed', 'Fri']);
  });

  it('copes with nothing stored yet', () => {
    expect(splitScheduleDays([])).toEqual({ dates: [], weekdays: [] });
  });
});

describe('getDatesForWeekdays', () => {
  // 2024-01-15 is a Monday.
  const monday = dayjs('2024-01-15');

  it('starts today when today is the day asked for', () => {
    const dates = getDatesForWeekdays(['Mon'], monday);

    expect(dates[0]).toBe('2024-01-15');
  });

  it('walks forward to a day later in the week', () => {
    const dates = getDatesForWeekdays(['Wed'], monday);

    expect(dates[0]).toBe('2024-01-17');
  });

  it('walks back to a day earlier in the week', () => {
    const dates = getDatesForWeekdays(['Sun'], monday);

    expect(dates[0]).toBe('2024-01-14');
  });

  it('repeats every seven days', () => {
    const dates = getDatesForWeekdays(['Mon'], monday);

    expect(dates[1]).toBe('2024-01-22');
    expect(dates[2]).toBe('2024-01-29');
  });

  it('covers about a year ahead', () => {
    const dates = getDatesForWeekdays(['Mon'], monday);

    expect(dates).toHaveLength(52);
  });

  it('never drifts off the day it was asked for', () => {
    const dates = getDatesForWeekdays(['Mon'], monday);

    const everyDateIsAMonday = dates.every(
      date => dayjs(date).format('ddd') === 'Mon',
    );

    expect(everyDateIsAMonday).toBe(true);
  });

  /**
   * 하루를 86400초로 세면 서머타임이 끝나 25시간이 되는 주에 하루가 밀립니다.
   *
   * 위의 1월 시작 케이스로는 못 잡습니다. 봄에 한 시간 잃고 가을에 한 시간
   * 얻어 서로 상쇄되기 때문입니다. 서머타임 구간에서 출발해야 드러납니다.
   * (테스트 타임존은 jest.config.js가 서머타임 있는 곳으로 고정합니다.)
   */
  describe('서머타임이 끝나는 구간을 지날 때', () => {
    // 2024-07-01은 서머타임 구간의 월요일이고, 서머타임은 11-03에 끝납니다.
    const summerMonday = dayjs('2024-07-01');

    it('하루가 밀리지 않습니다', () => {
      const dates = getDatesForWeekdays(['Mon'], summerMonday);

      expect(dates).toContain('2024-11-04');
      expect(dates).not.toContain('2024-11-03');
    });

    it('요일이 유지됩니다', () => {
      const dates = getDatesForWeekdays(['Mon'], summerMonday);

      const strayDates = dates.filter(
        date => dayjs(date).format('ddd') !== 'Mon',
      );

      expect(strayDates).toEqual([]);
    });
  });

  it('covers every day it was asked for', () => {
    const dates = getDatesForWeekdays(['Mon', 'Wed'], monday);

    expect(dates).toHaveLength(104);
    expect(dates).toContain('2024-01-15');
    expect(dates).toContain('2024-01-17');
  });

  it('gives nothing back when no day repeats', () => {
    expect(getDatesForWeekdays([], monday)).toEqual([]);
  });
});
