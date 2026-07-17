import dayjs, { Dayjs } from 'dayjs';

const DATE_PATTERN = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
const NON_DAY_CHARACTERS = /[[\]"' ]/g;

const WEEK_LITERAL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WEEKS_AHEAD = 52;
const DAYS_IN_WEEK = 7;

const ALARM_FORMAT = 'YYYY-MM-DD HH:mm';

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

interface IGetAlarmDatesProps {
  date: string;
  weekdays: Array<string>;
}

/**
 * 알람이 처음 울릴 날짜들을 구합니다.
 *
 * 고른 시각과, 다가오는 한 주 안에서 고른 요일에 해당하는 날들입니다.
 * 날짜는 매번 시작 시각에서 더합니다. 하루 더한 결과를 다음 계산의
 * 입력으로 되먹이면 오차가 쌓입니다.
 */
export const getAlarmDates = ({ date, weekdays }: IGetAlarmDatesProps) => {
  const start = dayjs(date);

  const dates = [start.format(ALARM_FORMAT)];

  for (let day = 1; day < DAYS_IN_WEEK; day++) {
    const next = start.add(day, 'day');

    if (weekdays.includes(next.format('ddd'))) {
      dates.push(next.format(ALARM_FORMAT));
    }
  }

  return dates;
};
