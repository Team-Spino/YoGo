import { splitDateAnd12Hour, to12Hour } from '../timeZone';

describe('to12Hour', () => {
  it('reads a morning time from a YYYY-MM-DD HH:mm string', () => {
    expect(to12Hour('2024-01-15 09:05')).toEqual({
      time: '9:05',
      meridiem: 'AM',
    });
  });

  it('reads an afternoon time and switches to PM', () => {
    expect(to12Hour('2024-01-15 14:30')).toEqual({
      time: '2:30',
      meridiem: 'PM',
    });
  });

  it('shows midnight as 12 AM', () => {
    expect(to12Hour('2024-01-15 00:00')).toEqual({
      time: '12:00',
      meridiem: 'AM',
    });
  });

  it('shows noon as 12 PM', () => {
    expect(to12Hour('2024-01-15 12:00')).toEqual({
      time: '12:00',
      meridiem: 'PM',
    });
  });

  it('reads the local wall clock from a Date', () => {
    // 테스트 타임존은 America/New_York(jest.config.js)입니다.
    const date = new Date('2024-01-15T14:30:00-05:00');

    expect(to12Hour(date)).toEqual({ time: '2:30', meridiem: 'PM' });
  });
});

describe('splitDateAnd12Hour', () => {
  it('keeps the date and turns the time into a 12-hour label', () => {
    expect(splitDateAnd12Hour('2024-01-15', '14:30')).toEqual([
      '2024-01-15',
      '2:30 PM',
    ]);
  });

  it('handles a morning time', () => {
    expect(splitDateAnd12Hour('2024-01-15', '09:05')).toEqual([
      '2024-01-15',
      '9:05 AM',
    ]);
  });
});
