import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatCityName } from 'utils';
import { ILiveTimeState } from 'types';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

interface ITargetTimeProps {
  currentTime: string;
  targetTimeZone: string;
}
interface ITimeProps {
  currentTime: string;
  targetTime: string;
}

export function useTimeZone() {
  const getCurrentTime = () => dayjs().format('YYYY-MM-DD HH:mm');

  const getTargetTime = ({ currentTime, targetTimeZone }: ITargetTimeProps) =>
    dayjs(currentTime).tz(targetTimeZone).format('YYYY-MM-DD HH:mm');

  const getTimeDifference = ({ currentTime, targetTime }: ITimeProps) => {
    const timeDiff = dayjs(currentTime).diff(dayjs(targetTime), 'hour');

    return timeDiff >= 0 ? `+${timeDiff}` : `${timeDiff}`;
  };

  const getDate = ({ currentTime, targetTime }: ITimeProps) => {
    const currentDate = new Date(currentTime).getDate();
    const targetDate = new Date(targetTime).getDate();

    if (currentDate > targetDate) return 'Yesterday';
    if (currentDate < targetDate) return 'Tomorrow';
    return 'Today';
  };

  const formatTime = ({ targetTime }: { targetTime: string | Date }) => {
    const [, time, meridiem] = new Date(targetTime)
      .toLocaleString('en-US')
      .split(' ');
    const [h, m] = time.split(':');

    return {
      time: `${h}:${m}`,
      meridiem: meridiem,
    };
  };

  const formatTo12Hour = ({ date, time }: { date: string; time: string }) => {
    const temp = new Date(`${date} ${time}`).toLocaleString('en-US');

    const [d, t, m] = dayjs(temp).format('YYYY-MM-DD HH:mm A').split(' ');

    return [d, `${t} ${m}`];
  };

  const setLiveTimeState = ({ location }: { location: string }) => {
    const currentTime = getCurrentTime();
    const targetTime = getTargetTime({
      currentTime,
      targetTimeZone: location,
    });
    const timeDifference = getTimeDifference({
      currentTime,
      targetTime,
    });
    const date = getDate({ currentTime, targetTime });

    return {
      ...formatTime({ targetTime }),
      timeDifference,
      date,
      city: formatCityName(location?.split('/')[1]),
    };
  };

  const getAlarmTime = ({ date, city }: { date: string; city: string }) => {
    const currentTime = getCurrentTime();
    const targetTime = getTargetTime({
      currentTime,
      targetTimeZone: city,
    });
    const currentCity = dayjs.tz.guess();

    const diff = Number(getTimeDifference({ currentTime, targetTime }));

    const millisec = dayjs(date).valueOf() + diff * 3600000;
    const time = dayjs(millisec).format('YYYY-MM-DD HH:mm');
    const isPastFormNow = dayjs(time).isBefore(dayjs(currentTime));
    return {
      time,
      locateCity: currentCity.split('/').at(-1),
      isPastFormNow,
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
    }, [timeState, setTimeState, location]);

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
