import { toFormat12Hour } from '../toFormat12Hour';

describe('toFormat12Hour', () => {
  it('turns a 24-hour time into a 12-hour label', () => {
    expect(toFormat12Hour({ day: '2024-01-15', time: '14:30' })).toBe('2:30 PM');
  });

  it('handles a morning time', () => {
    expect(toFormat12Hour({ day: '2024-01-15', time: '09:05' })).toBe('9:05 AM');
  });

  it('shows midnight as 12 AM', () => {
    expect(toFormat12Hour({ day: '2024-01-15', time: '00:00' })).toBe(
      '12:00 AM',
    );
  });
});
