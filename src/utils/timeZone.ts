import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

type RelativeDay = 'Yesterday' | 'Today' | 'Tomorrow';

interface IZoneComparisonProps {
  targetZone: string;
  baseZone: string;
  at?: string | number | Date;
}

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
  const instant = dayjs(at);

  return instant.tz(targetZone).utcOffset() - instant.tz(baseZone).utcOffset();
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

  return `${sign}${hours}:${String(minutes).padStart(2, '0')}`;
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
  const instant = dayjs(at);
  const targetDate = instant.tz(targetZone).format('YYYY-MM-DD');
  const baseDate = instant.tz(baseZone).format('YYYY-MM-DD');

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
