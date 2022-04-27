import React from 'react';
import { Title, TextBtn } from 'components';
import { IconDownArrow } from 'assets';
import * as S from './style';
interface IBTargetCityBtnProps {
  onPress: () => void;
  text: string;
}

export function SelectTargetCityBtn({ onPress, text }: IBTargetCityBtnProps) {
  return (
    <S.Container>
      <Title isEnable={true} text={'상대 도시 선택'} size={15} />
      <S.PressContainer onPress={onPress}>
        <TextBtn>{text}</TextBtn>
        <IconDownArrow />
      </S.PressContainer>
      <S.Wrapper>
        <S.Text>사용자의 [서울] 시간으로 pm 6:00 알람이 울립니다.</S.Text>
      </S.Wrapper>
    </S.Container>
  );
}
