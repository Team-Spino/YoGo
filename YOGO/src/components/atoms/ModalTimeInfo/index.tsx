import React from 'react';
import { Title, SubTitle } from 'components';
import { IconRight } from 'assets';
import { parseCity, formatCityName, toFormat12Hour } from 'utils';
import { ITargetProps, ICurProps } from 'types';
import { useTimeZone } from 'hooks';
import * as S from './style';

interface IModalTimeProps {
  timeData: {
    target: ITargetProps;
    cur: ICurProps;
  };
  selectedDay: string;
}

interface IModalTimerProps {
  city: string;
  date: string;
  time: string;
}

function ModalTimer({ city, date, time }: IModalTimerProps) {
  const [t] = time.split(' ');
  return (
    <S.Wrapper>
      <Title isEnable={true} text={city} size={20} />
      <SubTitle isEnable={true} text={date} />
      <Title
        isEnable={true}
        text={toFormat12Hour({ day: date, time: t })}
        size={17}
      />
    </S.Wrapper>
  );
}

export function ModalTimeInfo({ timeData, selectedDay }: IModalTimeProps) {
  const { target, cur } = timeData;

  const { getTargetTime, formatTo12Hour } = useTimeZone();

  const { TARGET_CITY } = target;
  const { CUR_TIME, CUR_CITY } = cur;

  const [date, time] = getTargetTime({
    currentTime: `${selectedDay} ${CUR_TIME}`,
    targetTimeZone: TARGET_CITY,
  }).split(' ');

  const [targetDay, targetTime] = formatTo12Hour({
    date,
    time,
  });

  const [curDay, curTime] = formatTo12Hour({
    date: selectedDay,
    time: CUR_TIME,
  });

  return (
    <S.Container>
      <ModalTimer
        city={formatCityName(parseCity({ city: TARGET_CITY }))}
        date={targetDay}
        time={targetTime}
      />
      <IconRight />
      <ModalTimer
        city={formatCityName(parseCity({ city: CUR_CITY }))}
        date={curDay}
        time={curTime}
      />
    </S.Container>
  );
}
