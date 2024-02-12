import React, { useState, useEffect } from 'react';
import { Title, TextBtn } from 'components';
import { IconDownArrow } from 'assets';
import { useTimeZone } from 'hooks';
import { formatCityName, toFormat12Hour } from 'utils';
import * as S from './style';
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

  if (setAlartDate) {
    useEffect(() => {
      console.log(`date : ${date}`);
      if (city && date) {
        const { time, locateCity, isPastFormNow } = getAlarmTime({
          date: date.toString(),
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
  }

  const placeholder = () => {
    if (!isCityInputValid) {
      return 'Please select city';
    }

    return city.trim() ? formatCityName(city) : 'Country, City';
  };

  return (
    <S.Container isCityInputValid={isCityInputValid}>
      <Title
        isEnable={true}
        text={'Time Zone for The Destination Country'}
        size={15}
      />
      <S.PressContainer onPress={onPress}>
        <TextBtn>{placeholder()}</TextBtn>
        <IconDownArrow />
      </S.PressContainer>
      {notiAlartTime !== '' && (
        <S.Wrapper>
          <S.Text>{notiAlartTime}</S.Text>
        </S.Wrapper>
      )}
    </S.Container>
  );
}
