import dayjs from 'dayjs';
import { ZONE_ALIASES } from 'utils/zoneAliases';

/**
 * 타임존 계산을 Intl 위에 직접 올립니다.
 *
 * dayjs의 timezone 플러그인은 쓰지 않습니다. 그 플러그인은 속으로
 * `new Date(date.toLocaleString('en-US', { timeZone }))`처럼 로케일 문자열을
 * 다시 Date로 되돌리는데, Hermes(앱이 실제로 쓰는 엔진)의 Date 파서는
 * ISO 8601만 읽습니다. 그래서 `.tz()`가 통째로 Invalid Date가 되고,
 * 시차와 시각이 전부 NaN으로 나옵니다.
 *
 * 반면 `Intl.DateTimeFormat.formatToParts`는 Hermes에서도 제대로 동작하므로,
 * 존의 벽시계 값을 그걸로 읽어 오프셋을 직접 셈합니다.
 * jest는 Node(V8)에서 도는데 V8의 Date 파서는 관대해서, 이 차이는
 * 테스트로는 드러나지 않고 실기기에서만 드러납니다.
 */

type RelativeDay = 'Yesterday' | 'Today' | 'Tomorrow';

interface IZoneComparisonProps {
  targetZone: string;
  baseZone: string;
  at?: string | number | Date;
}

interface IZoneParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * 별칭 타임존 이름을 Hermes가 아는 정규 이름으로 바꿉니다.
 *
 * 표에 없으면 그대로 둡니다. 정규 이름은 그 자체로 통과합니다.
 */
export const canonicalZone = (timeZone: string): string =>
  ZONE_ALIASES[timeZone] ?? timeZone;

/** 24시간제 시/분을 12시간제 표시로 바꿉니다. */
const toMeridiem = (hour24: number, minute: number) => {
  const meridiem = hour24 < 12 ? 'AM' : 'PM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return { time: `${hour12}:${pad(minute)}`, meridiem };
};

/**
 * 시각을 `9:05 AM` 꼴로 읽습니다.
 *
 * 문자열이면 `HH:mm`만 그대로 떼어 씁니다. 문자열을 다시 Date로 되돌리지
 * 않습니다. Hermes의 Date 파서는 ISO만 읽어서, `2024/01/15 09:05` 같은
 * 값을 파싱하면 Invalid Date가 되고 화면에 "Date"만 뜹니다.
 */
export const to12Hour = (
  value: string | Date,
): { time: string; meridiem: string } => {
  if (value instanceof Date) {
    return toMeridiem(value.getHours(), value.getMinutes());
  }

  const match = value.match(/(\d{1,2}):(\d{2})/);

  if (!match) return { time: value, meridiem: '' };

  return toMeridiem(Number(match[1]), Number(match[2]));
};

/**
 * `YYYY-MM-DD` 날짜와 `HH:mm` 시각을 `[날짜, "9:05 AM"]`으로 묶습니다.
 *
 * 날짜는 그대로 두고 시각만 12시간제로 바꿉니다. 여기서도 문자열을 다시
 * Date로 되돌리지 않습니다.
 */
export const splitDateAnd12Hour = (
  date: string,
  time: string,
): [string, string] => {
  const { time: label, meridiem } = to12Hour(`${date} ${time}`);

  return [date, `${label} ${meridiem}`];
};

/** 어떤 순간을 주어진 존의 벽시계로 읽습니다. */
const getZoneParts = (date: Date, timeZone: string): IZoneParts => {
  const parts = new Intl.DateTimeFormat('en-US', {
    hour12: false,
    timeZone: canonicalZone(timeZone),
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date);

  const read = (type: string) =>
    Number(parts.find(part => part.type === type)?.value);

  return {
    year: read('year'),
    month: read('month'),
    day: read('day'),
    // hour12: false로 읽으면 자정을 24로 내놓는 엔진이 있습니다.
    hour: read('hour') % 24,
    minute: read('minute'),
    second: read('second'),
  };
};

/**
 * 어떤 순간에 그 존이 UTC와 몇 분 떨어져 있는지 구합니다.
 *
 * 존의 벽시계 값을 UTC인 셈 치고 되돌린 뒤 실제 순간과의 차이를 봅니다.
 * 그 차이가 곧 그 시점의 오프셋이고, 서머타임도 자연히 반영됩니다.
 */
export const getZoneOffsetMinutes = (date: Date, timeZone: string): number => {
  const wallClock = getZoneParts(date, timeZone);

  const asIfUtc = Date.UTC(
    wallClock.year,
    wallClock.month - 1,
    wallClock.day,
    wallClock.hour,
    wallClock.minute,
    wallClock.second,
  );

  // 벽시계에는 밀리초가 없으니 실제 순간에서도 떼고 견줍니다.
  const instant = Math.floor(date.getTime() / 1000) * 1000;

  return (asIfUtc - instant) / 60000;
};

/** 기기가 놓인 타임존입니다. */
export const getDeviceZone = (): string =>
  new Intl.DateTimeFormat().resolvedOptions().timeZone;

/** 어떤 순간을 주어진 존의 `YYYY-MM-DD HH:mm`으로 씁니다. */
export const getZonedWallClock = (
  date: Date,
  timeZone: string,
  format: 'date' | 'dateTime' = 'dateTime',
): string => {
  const { year, month, day, hour, minute } = getZoneParts(date, timeZone);

  const calendarDate = `${year}-${pad(month)}-${pad(day)}`;

  if (format === 'date') return calendarDate;

  return `${calendarDate} ${pad(hour)}:${pad(minute)}`;
};

/**
 * 두 타임존의 시차를 분 단위로 구합니다.
 *
 * 오프셋은 주어진 시점 기준으로 읽으므로 서머타임이 반영되고,
 * 인도(+5:30)나 네팔(+5:45)처럼 분 단위 오프셋을 쓰는 존도 분을 잃지 않습니다.
 */
export const getOffsetMinutes = ({
  targetZone,
  baseZone,
  at,
}: IZoneComparisonProps): number => {
  const instant = dayjs(at).toDate();

  return (
    getZoneOffsetMinutes(instant, targetZone) -
    getZoneOffsetMinutes(instant, baseZone)
  );
};

/**
 * 두 타임존의 시차를 `+9`, `+5:30` 같은 표시용 문자열로 구합니다.
 */
export const getTimeDifference = ({
  targetZone,
  baseZone,
  at,
}: IZoneComparisonProps): string => {
  const diff = getOffsetMinutes({ targetZone, baseZone, at });

  const sign = diff < 0 ? '-' : '+';
  const absolute = Math.abs(diff);
  const hours = Math.floor(absolute / 60);
  const minutes = absolute % 60;

  if (minutes === 0) return `${sign}${hours}`;

  return `${sign}${hours}:${pad(minutes)}`;
};

/**
 * 대상 타임존이 기준 타임존과 견줘 어느 날짜에 있는지 구합니다.
 *
 * 달력 날짜 전체를 비교하므로 월말·연말 경계에서도 뒤집히지 않습니다.
 */
export const getRelativeDay = ({
  targetZone,
  baseZone,
  at,
}: IZoneComparisonProps): RelativeDay => {
  const instant = dayjs(at).toDate();

  const targetDate = getZonedWallClock(instant, targetZone, 'date');
  const baseDate = getZonedWallClock(instant, baseZone, 'date');

  if (targetDate < baseDate) return 'Yesterday';
  if (targetDate > baseDate) return 'Tomorrow';

  return 'Today';
};

/**
 * IANA 타임존 이름에서 도시명을 뽑아냅니다.
 *
 * `Japan`처럼 지역 접두사가 없는 존과 `America/Argentina/Buenos_Aires`처럼
 * 세 부분으로 된 존을 모두 다룹니다.
 */
export const getCityFromZone = (zone?: string): string => {
  if (!zone) return '';

  const city = zone.split('/').pop() as string;

  return city.replace(/_/g, ' ');
};
