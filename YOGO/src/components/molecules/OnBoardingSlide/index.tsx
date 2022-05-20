import React from 'react';
import * as S from './style';
import { BottomSheetBtn } from 'components';

interface ImgOnBoardingSlideProps {
  mainImg: React.ReactNode;
  typography: React.ReactNode;
  text: string;
  btnText: string;
  isEnd?: boolean;
}

export const OnBoardingSlide = ({ mainImg, typography ,text, btnText, isEnd } : ImgOnBoardingSlideProps) => {
  return (
    <S.Container>
      <S.MainImg>
      { mainImg }
      </S.MainImg>
      <S.Content isEnd={isEnd}>
        { typography }
       <S.Text>{ text }</S.Text>
      </S.Content>
      <BottomSheetBtn text={btnText} isRevers={true} onPress={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </S.Container>
  );
}
