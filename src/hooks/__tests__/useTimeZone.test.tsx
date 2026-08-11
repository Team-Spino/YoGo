import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { useTimeZone } from '../useTimeZone';

type TimeZone = ReturnType<typeof useTimeZone>;

const renderUseTimeZone = () => {
  let result: TimeZone;

  const Probe = () => {
    result = useTimeZone();

    return null;
  };

  act(() => {
    renderer.create(<Probe />);
  });

  return result!;
};

/**
 * 기기는 America/New_York이고(jest.config.js), 지금은 1월 곧 서머타임이 아닙니다.
 * 그래서 "지금"의 오프셋과 여름 일정의 오프셋이 서로 다릅니다.
 */
describe('getAlarmTime', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-10T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('고른 도시의 시각을 기기 시각으로 되돌립니다', () => {
    const { getAlarmTime } = renderUseTimeZone();

    // 서울 1월은 +9, 뉴욕 1월은 -5. 14시간 차이.
    const { time } = getAlarmTime({
      date: '2024-01-20 09:00',
      city: 'Asia/Seoul',
    });

    expect(time).toBe('2024-01-19 19:00');
  });

  it('일정 날짜에 적용되는 오프셋을 씁니다, 오늘 것이 아니라', () => {
    const { getAlarmTime } = renderUseTimeZone();

    // 7월의 서울은 여전히 +9지만 기기(뉴욕)는 서머타임이라 -4입니다.
    // 오늘(1월, -5) 기준으로 계산하면 한 시간 어긋납니다.
    const { time } = getAlarmTime({
      date: '2024-07-20 09:00',
      city: 'Asia/Seoul',
    });

    expect(time).toBe('2024-07-19 20:00');
  });

  it('기기가 있는 도시 이름을 알려줍니다', () => {
    const { getAlarmTime } = renderUseTimeZone();

    const { locateCity } = getAlarmTime({
      date: '2024-01-20 09:00',
      city: 'Asia/Seoul',
    });

    expect(locateCity).toBe('New York');
  });
});

describe('formatTime', () => {
  it('문자열로 준 시각을 그대로 읽습니다', () => {
    const { formatTime } = renderUseTimeZone();

    expect(formatTime({ targetTime: '2024-01-15 14:00' })).toEqual({
      time: '2:00',
      meridiem: 'PM',
    });
  });

  it('Date로 줘도 문자열과 같은 시각을 냅니다', () => {
    const { formatTime } = renderUseTimeZone();

    // 기기가 뉴욕이므로 둘 다 같은 순간입니다.
    const fromText = formatTime({ targetTime: '2024-01-15 14:00' });
    const fromDate = formatTime({
      targetTime: new Date('2024-01-15T14:00:00-05:00'),
    });

    expect(fromDate).toEqual(fromText);
  });
});
