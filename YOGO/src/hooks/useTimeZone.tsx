import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezone from 'dayjs/plugin/timezone';
import { ILiveTimeState } from 'types';

dayjs.extend(utc);
dayjs.extend(timezone);

interface ITargetTimeProps {
  currentTime: string;
  targetTimeZone: string;
}
interface ITimeProps {
  currentTime: string;
  targetTime: string;
}

interface IFormatProps {
  location: string;
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

  const formatTime = ({ location, targetTime }: IFormatProps) => {
    const [, time, meridiem] = new Date(targetTime)
      .toLocaleString('en-US', { timeZone: location })
      .split(' ');
    const [h, m] = time.split(':');

    return {
      time: `${h}:${m}`,
      meridiem: meridiem,
    };
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
      ...formatTime({ location, targetTime }),
      timeDifference,
      date,
      city: location.split('/')[1],
    };
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

  return { useLiveTimer };
}
