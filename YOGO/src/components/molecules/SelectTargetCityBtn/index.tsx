import React, { useState, useEffect } from 'react';
import { Title, TextBtn } from 'components';
import { IconDownArrow } from 'assets';
import { useTimeZone } from 'hooks';
import * as S from './style';
interface IBTargetCityBtnProps {
  onPress: () => void;
  city: string;
  date?: Date;
  setAlartDate?: (date: string) => void;
}

export function SelectTargetCityBtn({
  onPress,
  city,
  date,
  setAlartDate,
}: IBTargetCityBtnProps) {
  const [notiAlartTime, setNotiAlartTime] = useState<string>('');

  const { getAlarmTime } = useTimeZone();
  useEffect(() => {
    if (city && date) {
      const { time, locateCity, isPastFormNow } = getAlarmTime({
        date: date.toString(),
        city: city,
      });

      setAlartDate(time);
      setNotiAlartTime(`${locateCity} 기준 ${time}에 알람이 울립니다.`);
    }
  }, [city, date]);
  return (
    <S.Container>
      <Title isEnable={true} text={'상대 도시 선택'} size={15} />
      <S.PressContainer onPress={onPress}>
        <TextBtn>{city.trim() ? city : '국가, 도시'}</TextBtn>
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
