import React from 'react';
import dayjs from 'dayjs';
import {
  ResultCard,
  BottomSheetBtn,
  BottomSheetHeader,
  IconAbsolute,
} from 'components';
import { IconResultArrow, IconWorld } from 'assets';
import { IMakeProps } from 'types';
import { useTimeZone } from 'hooks';
import * as S from './style';

interface IResultBSProps {
  onPress: (submitObject: IMakeProps) => void;
  submitObject: IMakeProps;
}

export function ResultSheet({ onPress, submitObject }: IResultBSProps) {
  const { TARGET_CITY: tarCity, TARGET_DAY: tarDate } = submitObject;

  const { getAlarmTime, formatTime } = useTimeZone();

  const { locateCity, time } = getAlarmTime({
    date: tarDate.toString(),
    city: tarCity,
  });

  const tarDateFormat = dayjs(tarDate).format('YYYY-MM-DD');
  const [curDate, _] = time.split(' ');
  const { time: curTime, meridiem: curMeridiem } = formatTime({
    targetTime: time,
  });
  const { time: tarTime, meridiem: tarMeridiem } = formatTime({
    targetTime: tarDate,
  });

  return (
    <S.ResultBox>
      <BottomSheetHeader
        text={'Caculated Time Zone'}
        size={18}
        isWhite={true}
      />
      <S.Inner>
        <IconAbsolute>
          <IconWorld />
        </IconAbsolute>
        <ResultCard
          cardHeader={'Target Time Zone'}
          city={tarCity.split('/').pop()}
          date={tarDateFormat}
          time={tarTime}
          meridiem={tarMeridiem}
        />
        <IconResultArrow />
        <ResultCard
          cardHeader="Your Time Zone"
          city={locateCity}
          date={curDate}
          time={curTime}
          meridiem={curMeridiem}
        />
      </S.Inner>
      <BottomSheetBtn
        text={'Make Schedule'}
        onPress={() => onPress(submitObject)}
        isRevers={true}
      />
    </S.ResultBox>
  );
}
