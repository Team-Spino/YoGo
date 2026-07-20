import React from 'react';
import { Dimensions } from 'react-native';
import { View } from '@tamagui/core';
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
import { getCityFromZone } from 'utils';

const screenHeight = Dimensions.get('screen').height;

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
    <View
      height={screenHeight * 0.9}
      width="100%"
      alignItems="center"
      paddingTop={20}
    >
      <BottomSheetHeader
        text={'Caculated Time Zone'}
        size={18}
        isWhite={true}
      />
      <View
        width="100%"
        flex={1}
        paddingHorizontal={20}
        paddingBottom={100}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={16}
      >
        <IconAbsolute>
          <IconWorld />
        </IconAbsolute>
        <ResultCard
          cardHeader={'Target Time Zone'}
          city={getCityFromZone(tarCity)}
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
      </View>
      <BottomSheetBtn
        text={'Make Schedule'}
        onPress={() => onPress(submitObject)}
        isRevers={true}
      />
    </View>
  );
}
