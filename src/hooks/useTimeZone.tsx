import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  getCityFromZone,
  getOffsetMinutes,
  getRelativeDay,
  getTimeDifference,
  parseToSlash,
} from 'utils';
import { ILiveTimeState } from 'types';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

interface ITargetTimeProps {
  currentTime: string;
  targetTimeZone: string;
}

export function useTimeZone() {
  const getCurrentTime = () => dayjs().format('YYYY-MM-DD HH:mm');

  const getTargetTime = ({ currentTime, targetTimeZone }: ITargetTimeProps) =>
    dayjs(currentTime).tz(targetTimeZone).format('YYYY-MM-DD HH:mm');

  const formatTime = ({ targetTime }: { targetTime: string | Date }) => {
    const [, time, meridiem] = new Date(parseToSlash(targetTime))
      .toLocaleString('en-US')
      .split(' ');
    const [h, m] = time.split(':');

    return {
      time: `${h}:${m}`,
      meridiem: meridiem,
    };
  };

  const formatTo12Hour = ({ date, time }: { date: string; time: string }) => {
    const temp = new Date(parseToSlash(`${date} ${time}`)).toLocaleString(
      'en-US',
    );

    const [d, t, m] = dayjs(temp).format('YYYY-MM-DD HH:mm A').split(' ');

    return [d, `${t} ${m}`];
  };

  const setLiveTimeState = ({ location }: { location: string }) => {
    const currentTime = getCurrentTime();
    const baseZone = dayjs.tz.guess();

    const targetTime = getTargetTime({
      currentTime,
      targetTimeZone: location,
    });

    return {
      ...formatTime({ targetTime }),
      timeDifference: getTimeDifference({ targetZone: location, baseZone }),
      date: getRelativeDay({ targetZone: location, baseZone }),
      city: getCityFromZone(location),
    };
  };

  const getAlarmTime = ({ date, city }: { date: string; city: string }) => {
    const currentTime = getCurrentTime();
    const baseZone = dayjs.tz.guess();

    // 사용자가 고른 시각은 대상 도시의 벽시계 기준이라, 기기 시각으로 되돌려야 알람이 맞습니다.
    // 시차는 일정 날짜 기준으로 읽습니다. 지금 기준으로 읽으면 그 사이에
    // 서머타임이 바뀌는 일정이 한 시간 어긋납니다.
    const offsetMinutes = getOffsetMinutes({
      targetZone: city,
      baseZone,
      at: date,
    });

    const millisec = dayjs(date).valueOf() - offsetMinutes * 60000;
    const time = dayjs(millisec).format('YYYY-MM-DD HH:mm');
    const isPastFromNow = dayjs(time).isBefore(dayjs(currentTime));

    return {
      time,
      locateCity: getCityFromZone(baseZone),
      isPastFromNow,
    };
  };

  const getLeftTimeFromNow = ({ date }: { date: string }): string => {
    if (!dayjs().isBefore(date)) return 'This schedule was completed';
    return dayjs(date).fromNow();
  };

  const useLiveTimer = ({ location }: { location: string }) => {
    const [timeState, setTimeState] = useState<ILiveTimeState>({
      ...setLiveTimeState({ location }),
    });

    useEffect(() => {
      const timeout = setInterval(() => {
        setTimeState(prevState => ({
          ...prevState,
          ...setLiveTimeState({ location }),
        }));
      }, 500);
      return () => clearInterval(timeout);
    }, [location]);

    return timeState;
  };

  return {
    useLiveTimer,
    getTargetTime,
    getLeftTimeFromNow,
    getAlarmTime,
    formatTime,
    formatTo12Hour,
  };
}
