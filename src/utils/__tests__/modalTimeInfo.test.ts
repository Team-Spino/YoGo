import { getModalTimeInfo } from '../modalTimeInfo';

// 테스트 타임존은 America/New_York(jest.config.js)입니다.
describe('getModalTimeInfo', () => {
  const target = {
    TARGET_TIME: '23:00',
    TARGET_CITY: 'Asia/Seoul',
    TARGET_DAY: '2024-01-15',
  };
  const cur = {
    CUR_TIME: '09:00',
    CUR_CITY: 'America/New_York',
    CUR_DAY: '2024-01-15',
  };

  it('shows the two cities by name', () => {
    const info = getModalTimeInfo({ target, cur, selectedDay: '2024-01-15' });

    expect(info.target.city).toBe('Seoul');
    expect(info.cur.city).toBe('New York');
  });

  it('turns the local time into the target city’s wall clock', () => {
    // 기기(뉴욕)에서 2024-01-15 09:00을 서울로 보면 그날 23:00입니다.
    const info = getModalTimeInfo({ target, cur, selectedDay: '2024-01-15' });

    expect(info.target.time).toBe('11:00 PM');
    expect(info.target.date).toBe('2024-01-15');
  });

  it('shows the chosen day’s local time as-is', () => {
    const info = getModalTimeInfo({ target, cur, selectedDay: '2024-01-15' });

    expect(info.cur.time).toBe('9:00 AM');
    expect(info.cur.date).toBe('2024-01-15');
  });

  it('handles alias zones (Kolkata) without breaking', () => {
    const info = getModalTimeInfo({
      target: { ...target, TARGET_CITY: 'Asia/Kolkata' },
      cur,
      selectedDay: '2024-01-15',
    });

    // 뉴욕 09:00 → 콜카타(+5:30, 뉴욕 대비 +10:30)는 그날 19:30.
    expect(info.target.city).toBe('Kolkata');
    expect(info.target.time).toBe('7:30 PM');
  });
});
