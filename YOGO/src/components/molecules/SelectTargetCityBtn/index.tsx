import React from 'react';
import { Title, TextBtn } from 'components';
import * as S from './style';
import { IconDownArrow } from 'assets';
interface IBTargetCityBtnProps {
  onPress: () => void;
  text: string;
}


export function SelectTargetCityBtn({ onPress , text }: IBTargetCityBtnProps) {

  return (
    <S.Container>
      <Title isEnable={true} text={"상대 도시 선택"} size={15} />
      <S.PressContainer onPress={onPress}>
        <TextBtn>{text}</TextBtn>
        <IconDownArrow />
      </S.PressContainer>
    </S.Container>
  );
}
