import React from 'react';
import * as S from './style';
import { BottomSheetBtn } from 'components';

interface ImgOnBoardingStartEndProps {
  mainImg: React.ReactNode;
  typography: React.ReactNode;
  text: string;
  btnText: string;
  isEnd?: boolean;
  onPress: any
}

export const OnBoardingStartEnd = ({ mainImg, typography ,text, btnText, isEnd, onPress } : ImgOnBoardingStartEndProps) => {
  return (
    <S.Container>
      <S.MainImg>
      { mainImg }
      </S.MainImg>
      <S.Content isEnd={isEnd}>
        { typography }
       <S.Text>{ text }</S.Text>
      </S.Content>
      <BottomSheetBtn text={btnText} isRevers={true} onPress={()=>onPress()} />
    </S.Container>
  );
}
// isFirst: true
// {
// isFirst: false
// }
// {

//   isFist: tuee
// }
