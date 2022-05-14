import React from 'react';
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
import dayjs from 'dayjs';


interface IResultBSProps {
  onPress: () => void;
  submitObject : IMakeProps;
}

export const ResultSheet = ({ onPress, submitObject }: IResultBSProps) => {
  const { city :tarCity , date : tarDate } = submitObject;

  // console.log(tarCity, curDate)
  const { useLiveTimer, getAlarmTime } = useTimeZone();


  const { time, locateCity, isPastFormNow } = getAlarmTime({
    date: tarDate.toString(),
    city: tarCity,
  });


  const tarDateFormat = dayjs(tarDate).format('YYYY-MM-DD');
  const tarTimeFormat = dayjs(tarDate).format('HH:mm');
  const [curDate, curTime] = time.split(' ');

  const fromTilte = `${locateCity} \n ${curDate}`;
  const toTilte = `${tarCity} \n ${tarDateFormat}`;

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
        <ResultCard title={fromTilte} time={curTime} meridiem="pm" />
        <ResultCard title={toTilte} time={tarTimeFormat} meridiem={`am`}/>
      </S.Inner>
      <BottomSheetBtn text={'Make'} onPress={onPress} isRevers={true} />
    </S.ResultBox>
  );
};
