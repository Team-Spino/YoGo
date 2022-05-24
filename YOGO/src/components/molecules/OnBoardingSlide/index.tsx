import React from 'react';
import * as S from './style';
import { BottomSheetBtn, OnBoardingtBtn } from 'components';
import { IOnBoadingSlide } from 'types';

export const OnBoardingSlide = ({
  mainImg,
  typography,
  isEdge,
  text,
  btnText,
  onSkipPress,
  onNextPress,
}: IOnBoadingSlide) => {
  return (
    <S.Container>
      <S.MainImg>{mainImg}</S.MainImg>
      <S.Content>
        {typography}
        <S.Text>{text}</S.Text>
      </S.Content>
      {isEdge && (
        <BottomSheetBtn
          text={btnText as string}
          isRevers={true}
          onPress={onNextPress as () => void | ((index: number) => void)}
        />
      )}
      {!isEdge && (
        <>
          <OnBoardingtBtn
            text={btnText[1]}
            isSkip={true}
            onPress={onSkipPress as () => void | ((index: number) => void)}
          />
          <OnBoardingtBtn
            text={btnText[0]}
            isSkip={false}
            onPress={onNextPress as () => void | ((index: number) => void)}
          />
        </>
      )}
    </S.Container>
  );
};
