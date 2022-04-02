import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'future %s',
    past: 'ago %s',
    s: '0',
    m: '0',
    mm: '0',
    h: '1',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});

export function useTimeZone() {
  const curDeviceTimeZone = dayjs.tz.guess();

  const getCurLocalTime = () => dayjs().format('YYYY-MM-DD HH:mm');

  const getTargetLocalTime = ({
    curLocalTime,
    targetLocal,
  }: {
    curLocalTime: string;
    targetLocal: string;
  }) => dayjs(curLocalTime).tz(targetLocal).format('YYYY-MM-DD HH:mm');

  const getTimeDifference = ({
    targetLocalTime,
  }: {
    targetLocalTime: string;
  }) => {
    const result = dayjs(targetLocalTime).fromNow().split(' ');

    if (result[1] === '0') return `+${result[1]}`;

    if (result[0] === 'future') return `+${result[1]}`;

    if (result[0] === 'ago') return `-${result[1]}`;
  };

  const getDateDifference = ({
    targetLocalTime,
  }: {
    targetLocalTime: string;
  }) => {
    const time = targetLocalTime.split(' ')[0];

    if (dayjs().isSame(time, 'date')) return '오늘';

    if (dayjs().isAfter(time, 'date')) return '어제';

    if (dayjs().isBefore(time, 'date')) return '내일';
  };

  const getCurrentTimeZone = ({
    selectedTimeZone,
  }: {
    selectedTimeZone: string;
  }) => {
    const curLocalTime = getCurLocalTime();
    const [timeState, setTimeState] = useState({
      time: curLocalTime,
      dateDifference: '',
      timeDifference: '',
    });

    useEffect(() => {
      const timeout = setInterval(() => {
        const time = getTargetLocalTime({
          curLocalTime,
          targetLocal: selectedTimeZone,
        }) as string;

        const dateDifference = getDateDifference({
          targetLocalTime: time,
        }) as string;

        const timeDifference = getTimeDifference({
          targetLocalTime: time,
        }) as string;

        setTimeState(prev => ({
          ...prev,
          time,
          dateDifference,
          timeDifference,
        }));
      }, 500);

      return () => clearInterval(timeout);
    }, [timeState, setTimeState]);

    return timeState;
  };

  return {
    curDeviceTimeZone,
    getCurrentTimeZone,
    getCurLocalTime,
    getTargetLocalTime,
  };
}
