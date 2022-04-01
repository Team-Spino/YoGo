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
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
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
      const timeout = setTimeout(() => {
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

      return () => clearTimeout(timeout);
    }, [timeState, setTimeState]);

    return timeState;
  };

  // console.log(getCurrentTimeZone({ selectedTimeZone: 'America/New_York' }));

  return { curDeviceTimeZone, getCurrentTimeZone };
}

// setInterval(() => {
//   const currentTime = dayjs().format('YYYY-MM-DD HH:mm');
//   const result = dayjs(currentTime)
//     .tz(selectedTimeZone)
//     .format('YYYY-MM-DD HH:mm');
//   const timeDifferenceA = Number(currentTime.split(' ')[1].split(':')[0]);
//   const timeDifferenceB = Number(result.split(' ')[1].split(':')[0]);

//   console.log(dayjs(result).fromNow());
//   // console.log(dayjs(currentTime.split(' ')[0]));
//   // console.log(dayjs(result.split(' ')[0]));

//   console.log(timeDifferenceB - timeDifferenceA);
// }, 1000);
