import dayjs from 'dayjs';
import { ICurProps, ITargetProps } from 'types';
import {
  getCityFromZone,
  getZonedWallClock,
  splitDateAnd12Hour,
} from 'utils/timeZone';

interface IGetModalTimeInfoProps {
  target: ITargetProps;
  cur: ICurProps;
  selectedDay: string;
}

interface ICityTime {
  city: string;
  date: string;
  time: string;
}

/**
 * 상세 모달이 보여줄, 두 도시의 도시명·날짜·12시간제 시각을 만듭니다.
 *
 * 순수 함수입니다. 예전에는 이 계산이 atom 컴포넌트 안에 있었고, 결과
 * 문자열을 다시 쪼개 재포맷하다 PM이 AM으로 뒤집히는 버그가 있었습니다.
 */
export const getModalTimeInfo = ({
  target,
  cur,
  selectedDay,
}: IGetModalTimeInfoProps): { target: ICityTime; cur: ICityTime } => {
  const { TARGET_CITY } = target;
  const { CUR_TIME, CUR_CITY } = cur;

  // 고른 날의 내 시각을 대상 도시의 벽시계로 옮깁니다.
  const targetWallClock = getZonedWallClock(
    dayjs(`${selectedDay} ${CUR_TIME}`).toDate(),
    TARGET_CITY,
  );
  const [targetDate, targetTime] = targetWallClock.split(' ');

  const [tDay, tLabel] = splitDateAnd12Hour(targetDate, targetTime);
  const [cDay, cLabel] = splitDateAnd12Hour(selectedDay, CUR_TIME);

  return {
    target: { city: getCityFromZone(TARGET_CITY), date: tDay, time: tLabel },
    cur: { city: getCityFromZone(CUR_CITY), date: cDay, time: cLabel },
  };
};
