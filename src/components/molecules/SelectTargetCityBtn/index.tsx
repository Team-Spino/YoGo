import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { View, Text } from '@tamagui/core';
import { Title, TextBtn } from 'components';
import { IconDownArrow } from 'assets';
import { useTimeZone } from 'hooks';
import { formatCityName, toFormat12Hour } from 'utils';
interface IBTargetCityBtnProps {
  onPress: () => void;
  city: string;
  date?: Date;
  setAlartDate?: (date: string) => void | null;
  isCityInputValid?: boolean;
}

export function SelectTargetCityBtn({
  onPress,
  city,
  date,
  setAlartDate,
  isCityInputValid,
}: IBTargetCityBtnProps) {
  const [notiAlartTime, setNotiAlartTime] = useState<string>('');

  const { getAlarmTime } = useTimeZone();

  useEffect(() => {
    // date는 Date 객체입니다. date.toString()은 "Mon Jul 20 2026 ... GMT+0900"
    // 같은 장황한 문자열이라 Hermes/dayjs가 파싱하지 못해 뒤쪽 계산이 죽습니다.
    // dayjs는 Date를 문자열 파싱 없이 구성요소로 읽으므로, 앱 전역에서 쓰는
    // Hermes-safe 포맷(YYYY-MM-DD HH:mm)으로 정규화해 넘깁니다.
    const parsed = dayjs(date);

    if (setAlartDate && city && date && parsed.isValid()) {
      const { time, locateCity } = getAlarmTime({
        date: parsed.format('YYYY-MM-DD HH:mm'),
        city: city,
      });

      setAlartDate(time);

      const [d, t] = time.split(' ');

      setNotiAlartTime(
        `The Alarm goes off at ${toFormat12Hour({
          day: d,
          time: t,
        })} in ${locateCity}.`,
      );
    }
  }, [city, date]);

  const placeholder = () => {
    if (!isCityInputValid) {
      return 'Please select city';
    }

    return city.trim() ? formatCityName(city) : 'Country, City';
  };

  const showError = !isCityInputValid;

  return (
    <View
      width="100%"
      paddingVertical={15}
      paddingHorizontal={20}
      borderWidth={showError ? 1 : undefined}
      borderColor={showError ? '#FF4949' : undefined}
      borderBottomWidth={1}
      borderBottomColor={showError ? '#FF4949' : '$borderColor'}
    >
      <Title
        isEnable={true}
        text={'Time Zone for The Destination Country'}
        size={15}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          marginTop: 15,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextBtn>{placeholder()}</TextBtn>
        <IconDownArrow />
      </TouchableOpacity>
      {notiAlartTime !== '' && (
        <View
          width="100%"
          paddingVertical={15}
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize={13} fontWeight="bold" color="#e5565e">
            {notiAlartTime}
          </Text>
        </View>
      )}
    </View>
  );
}
