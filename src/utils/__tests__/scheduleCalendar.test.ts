import dayjs from 'dayjs';
import {
  getAlarmDates,
  getDatesForWeekdays,
  splitScheduleDays,
} from '../scheduleCalendar';

/**
 * 테스트 타임존은 America/New_York입니다(jest.config.js).
 * UTC보다 서쪽이라 오프셋에 `-`가 붙고, 그래서 오프셋을 망가뜨리는
 * 문자열 처리가 여기서 드러납니다.
 */
describe('getAlarmDates', () => {
  // 2024-01-15는 월요일입니다.
  const mondayMorning = '2024-01-15 09:00';

  it('고른 시각부터 시작합니다', () => {
    const dates = getAlarmDates({ date: mondayMorning, weekdays: ['Mon'] });

    expect(dates[0]).toBe('2024-01-15 09:00');
  });

  it('며칠이 지나도 시각이 흐트러지지 않습니다', () => {
    const dates = getAlarmDates({
      date: mondayMorning,
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    });

    const strayTimes = dates.filter(date => !date.endsWith('09:00'));

    expect(strayTimes).toEqual([]);
  });

  it('고른 요일이 다가오는 한 주에 정확히 한 번씩 잡힙니다', () => {
    const dates = getAlarmDates({
      date: mondayMorning,
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    });

    expect(dates).toEqual([
      '2024-01-15 09:00',
      '2024-01-16 09:00',
      '2024-01-17 09:00',
      '2024-01-18 09:00',
      '2024-01-19 09:00',
      '2024-01-20 09:00',
      '2024-01-21 09:00',
    ]);
  });

  it('고르지 않은 요일은 건너뜁니다', () => {
    const dates = getAlarmDates({
      date: mondayMorning,
      weekdays: ['Mon', 'Wed'],
    });

    expect(dates).toEqual(['2024-01-15 09:00', '2024-01-17 09:00']);
  });

  it('고른 요일이 시작일 하나뿐이면 그날만 잡습니다', () => {
    const dates = getAlarmDates({ date: mondayMorning, weekdays: ['Mon'] });

    expect(dates).toEqual(['2024-01-15 09:00']);
  });

  it('서머타임이 시작하는 주를 지나도 시각이 유지됩니다', () => {
    // 2024-03-10에 서머타임이 시작합니다. 그 주의 목요일에서 출발합니다.
    const dates = getAlarmDates({
      date: '2024-03-07 09:00',
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    });

    expect(dates).toContain('2024-03-11 09:00');
    expect(dates.filter(date => !date.endsWith('09:00'))).toEqual([]);
  });
});

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
