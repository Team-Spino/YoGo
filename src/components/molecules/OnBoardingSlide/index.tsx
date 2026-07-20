import React from 'react';
import { View, Text } from '@tamagui/core';
import { OnBoardingtBtn } from 'components';
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
    <View
      flex={1}
      position="relative"
      justifyContent="center"
      alignItems="center"
      backgroundColor="$background"
    >
      <View
        width="100%"
        height="100%"
        position="absolute"
        top="-10%"
        bottom={0}
        justifyContent="center"
        alignItems="center"
        zIndex={-1}
      >
        {mainImg}
      </View>
      <View
        flex={1}
        marginTop="100%"
        justifyContent="center"
        alignItems="center"
      >
        {typography}
        <Text
          color="$colorSubtle"
          marginTop={24}
          fontSize={16}
          lineHeight={24}
          letterSpacing={-0.2}
          paddingHorizontal={32}
          textAlign="center"
        >
          {text}
        </Text>
      </View>
      {isEdge && (
        <OnBoardingtBtn
          text={btnText as string}
          isCTA={true}
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
    </View>
  );
};
