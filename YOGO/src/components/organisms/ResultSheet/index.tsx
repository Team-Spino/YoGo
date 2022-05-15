import React from 'react';
import dayjs from 'dayjs';
import {
  ResultCard,
  BottomSheetBtn,
  BottomSheetHeader,
  IconAbsolute,
} from 'components';
import { IconWorld } from 'assets';
import { IMakeProps } from 'types';
import { useTimeZone } from 'hooks';
import * as S from './style';

interface IResultBSProps {
  onPress: () => void;
  submitObject : IMakeProps;
}

export const ResultSheet = ({ onPress, submitObject }: IResultBSProps) => {
  const { city :tarCity , date : tarDate } = submitObject;

  const { getAlarmTime, formatTime } = useTimeZone();

  const { locateCity, time } = getAlarmTime({
    date: tarDate.toString(),
    city: tarCity,
  });

  const tarDateFormat = dayjs(tarDate).format('YYYY-MM-DD');
  const [curDate, _ ] = time.split(' ');
  const { time : curTime , meridiem : curMeridiem} =  formatTime({ targetTime: time });
  const { time : tarTime , meridiem : tarMeridiem} =  formatTime({ targetTime: tarDate });

  return (
    <S.ResultBox>
      <BottomSheetHeader
        text={'We Find your Time Zone'}
        size={18}
        isWhite={true}
      />
      <S.Inner>
        <IconAbsolute>
          <IconWorld />
        </IconAbsolute>
        <ResultCard city={locateCity} date={curDate} time={curTime} meridiem={curMeridiem} />
        <ResultCard city={tarCity} date={tarDateFormat} time={tarTime} meridiem={tarMeridiem}/>
      </S.Inner>
      <BottomSheetBtn text={'Make'} onPress={onPress} isRevers={true} />
    </S.ResultBox>
  );
};
