import React from "react";
import { Text, View } from "react-native";
import * as S from './style'

export const TimeZoneCard = ({objectNation} : {objectNation : string} ) => {
  return (
  <>
   <S.Container>
     <S.leftDiv>
       <S.leftDivHeader>오늘, +10시간</S.leftDivHeader>
       <S.leftDivContent>{objectNation}</S.leftDivContent>
     </S.leftDiv>
     <S.rightDiv>
       <S.rightDivTime>08:00</S.rightDivTime>
       <S.rightDivTimeTail>pm</S.rightDivTimeTail>
     </S.rightDiv>
     </S.Container>
   </>
  );
};