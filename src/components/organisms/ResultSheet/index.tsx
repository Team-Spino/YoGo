import React from 'react';
import { Dimensions } from 'react-native';
import { View, Text } from '@tamagui/core';
import dayjs from 'dayjs';
import { ResultCard, BottomSheetBtn } from 'components';
import { Display } from 'styles/ui';
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

  const tarDateFormat = dayjs(tarDate).format('ddd, MMM D');
  const [curDate] = time.split(' ');
  const yourDateFormat = dayjs(curDate).format('ddd, MMM D');

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
      paddingHorizontal={24}
      paddingTop={28}
    >
      <Display>Alarm</Display>

      <View flex={1} justifyContent="center">
        <ResultCard
          cardHeader="Event"
          city={getCityFromZone(tarCity)}
          date={tarDateFormat}
          time={tarTime}
          meridiem={tarMeridiem}
        />

        <View
          flexDirection="row"
          alignItems="center"
          gap={12}
          paddingVertical={28}
        >
          <View flex={1} height={1} backgroundColor="$borderColor" />
          <Text fontSize={12} color="$colorSubtle">
            rings at your time
          </Text>
          <View flex={1} height={1} backgroundColor="$borderColor" />
        </View>

        <ResultCard
          cardHeader="Your alarm"
          city={locateCity}
          date={yourDateFormat}
          time={curTime}
          meridiem={curMeridiem}
        />
      </View>

      <View paddingBottom={16}>
        <BottomSheetBtn
          text={'Make schedule'}
          onPress={() => onPress(submitObject)}
          isRevers={false}
        />
      </View>
    </View>
  );
}
