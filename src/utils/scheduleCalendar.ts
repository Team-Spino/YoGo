import dayjs, { Dayjs } from 'dayjs';

const DATE_PATTERN = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
const NON_DAY_CHARACTERS = /[[\]"' ]/g;

const WEEK_LITERAL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WEEKS_AHEAD = 52;

interface IScheduleDayRow {
  result: string;
}

/**
 * 일정이 저장한 날짜 정보를 두 갈래로 나눕니다.
 *
 * 한 번뿐인 일정은 `2024-01-15` 같은 날짜로, 반복하는 일정은
 * `["Mon","Wed"]` 같은 요일 목록으로 들어옵니다.
 */
export const splitScheduleDays = (rows: Array<IScheduleDayRow>) => {
  const dates: Array<string> = [];
  const weekdays: Array<string> = [];

  rows.forEach(({ result }) => {
    if (DATE_PATTERN.test(result)) {
      dates.push(result);

      return;
    }

    result
      .replace(NON_DAY_CHARACTERS, '')
      .split(',')
      .forEach(day => {
        // 같은 요일에 여러 일정이 걸려 있어도 달력에는 한 번만 필요합니다.
        if (day && !weekdays.includes(day)) weekdays.push(day);
      });
  });

  return { dates, weekdays };
};

/**
 * 주어진 요일들이 앞으로 1년 동안 걸리는 날짜를 모두 구합니다.
 *
 * 날짜를 하루 단위로 더합니다. 초를 더하면 서머타임으로 25시간짜리
 * 날이 낀 주에 하루가 밀립니다.
 */
export const getDatesForWeekdays = (
  weekdays: Array<string>,
  from: Dayjs = dayjs(),
) => {
  const today = WEEK_LITERAL.indexOf(from.format('ddd'));

  return weekdays.flatMap(weekday => {
    const firstDate = from.add(WEEK_LITERAL.indexOf(weekday) - today, 'day');

    return Array.from({ length: WEEKS_AHEAD }, (_, week) =>
      firstDate.add(week * 7, 'day').format('YYYY-MM-DD'),
    );
  });
};
