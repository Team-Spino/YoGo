import React from 'react';
import * as S from './style';
import { BottomSheetBtn, OnBoardingtBtn } from 'components';

interface ImgOnBoardingSlideProps {
  mainImg: React.ReactNode;
  typography: React.ReactNode;
  text: string 
  isEdge: boolean;
  onSkipPress?: () => void;
  onNextPress: () => void;
  btnText: string | string[];
}

export const OnBoardingSlide = ({ mainImg, typography , isEdge , text, btnText , onSkipPress, onNextPress } : ImgOnBoardingSlideProps) =>{
  return (
    <S.Container>
      <S.MainImg>
      { mainImg }
      </S.MainImg>
      <S.Content>
        { typography }
       <S.Text>{ text }</S.Text>
      </S.Content>
      {
        isEdge && (<BottomSheetBtn text={btnText as string} isRevers={true} onPress={onNextPress} />)
      }
      {
          !isEdge && (   
          <>
          <OnBoardingtBtn text={btnText[1]} isSkip={true} onPress={onSkipPress} />
          <OnBoardingtBtn text={btnText[0]} isSkip={false} onPress={onNextPress} />
          </>
          )
      }
    </S.Container>
  );
}
