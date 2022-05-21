import React from 'react';
import * as S from './style';
import { BottomSheetBtn, OnBoardingtBtn } from 'components';

interface ImgOnBoardingSlideProps {
  mainImg: React.ReactNode;
  typography: React.ReactNode;
  text: string;
  onSkipePress: () => void;
  onNextPress: () => void;
}

export const OnBoardingSlide = ({ mainImg, typography ,text, onSkipePress, onNextPress } : ImgOnBoardingSlideProps) =>{
  return (
    <S.Container>
      <S.MainImg>
      { mainImg }
      </S.MainImg>
      <S.Content>
        { typography }
       <S.Text>{ text }</S.Text>
      </S.Content>
      <OnBoardingtBtn text={'Skip'} isSkip={true} onPress={()=>onSkipePress()} />
      <OnBoardingtBtn text={'Next'} isSkip={false} onPress={()=>onNextPress()} />
    </S.Container>
  );
}
