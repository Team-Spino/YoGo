import React, { useRef, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { OnBoardingSlide } from 'components';
import {
  ImgOnBoarding1,
  ImgOnBoarding1Text,
  ImgOnBoarding2,
  ImgOnBoarding2Text,
  ImgOnBoarding3,
  ImgOnBoarding4,
  ImgOnBoarding4Text,
  ImgOnBoarding5,
  ImgOnBoarding5Text,
  ImgOnBoarding6,
} from 'assets';
import { IOnBoadingSlide } from 'types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function OnBoardingSwiper({
  setOnBoard,
}: {
  setOnBoard: (value: boolean) => void;
}) {
  const [isStartOrEnd, setIsStartOrEnd] = useState(true);
  const swiperRef =
    useRef<React.MutableRefObject<React.MutableRefObject<Swiper>>>();

  const styles = StyleSheet.create({
    dot: {
      bottom: '7%',
    },
    disableDot: {
      bottom: '7%',
      display: 'none',
    },
  });

  const slide: Array<IOnBoadingSlide> = [
    {
      mainImg: <ImgOnBoarding1 />,
      typography: <ImgOnBoarding1Text />,
      text: `YOGO helps users to set up \n meetings easily across different timezones`,
      btnText: "Let's look into",
      isEdge: true,
      onNextPress: (index: number) => {
        swiperRef.current!.scrollTo(index, true);
      },
    },
    {
      mainImg: (
        <Image
          source={ImgOnBoarding2}
          style={{ width: '100%', top: -100 }}
          resizeMode="contain"
        />
      ),
      typography: <ImgOnBoarding2Text />,
      text: "Press '+'(plus) button to add schedule",
      btnText: ['Next', 'Skip'],
      isEdge: false,
      onSkipPress: () => swiperRef.current!.scrollTo(slide.length - 1, true),
      onNextPress: (index: number) => {
        swiperRef.current!.scrollTo(index, true);
      },
    },
    {
      mainImg: (
        <Image
          source={ImgOnBoarding3}
          style={{ width: '100%', top: -40 }}
          resizeMode="contain"
        />
      ),
      typography: <ImgOnBoarding2Text />,
      text: "If you select \n the time zone for the destination country, \n the schedule is automatically made",
      btnText: ['Next', 'Skip'],
      isEdge: false,
      onSkipPress: () => swiperRef.current!.scrollTo(slide.length - 1, true),
      onNextPress: (index: number) => {
        swiperRef.current!.scrollTo(index, true);
      },
    },
    {
      mainImg: (
        <Image
          source={ImgOnBoarding4}
          style={{ width: '90%', top: -40 }}
          resizeMode="contain"
        />
      ),
      typography: <ImgOnBoarding4Text />,
      text: 'Check the time \n difference of many countries at the same time',
      btnText: ['Next', 'Skip'],
      isEdge: false,
      onSkipPress: () => swiperRef.current!.scrollTo(slide.length - 1, true),
      onNextPress: (index: number) => {
        swiperRef.current!.scrollTo(index, true);
      },
    },
    {
      mainImg: <ImgOnBoarding5 />,
      typography: <ImgOnBoarding5Text />,
      text: '',
      btnText: ['Next', 'Skip'],
      isEdge: false,
      onSkipPress: () => swiperRef.current!.scrollTo(slide.length - 1, true),
      onNextPress: (index: number) => {
        swiperRef.current!.scrollTo(index, true);
      },
    },
    {
      mainImg: <ImgOnBoarding6 />,
      btnText: 'Continue',
      isEdge: true,
      onNextPress: (index: number) => {
        setOnBoard(false);
        AsyncStorage.setItem('keyFirstLaunch', 'true');
      },
    },
  ];

  const checkStartOrEnd = (index: number) => {
    if (index === 0 || index === 5) {
      setIsStartOrEnd(true);
    } else {
      setIsStartOrEnd(false);
    }
  };

  return (
    <Swiper
      showsButtons={false}
      dotStyle={isStartOrEnd ? styles.disableDot : styles.dot}
      activeDotStyle={isStartOrEnd ? styles.disableDot : styles.dot}
      activeDotColor={'#ffffff'}
      loop={false}
      onIndexChanged={checkStartOrEnd}
      ref={swiperRef}
    >
      {slide.map((item: IOnBoadingSlide, index) => {
        return (
          <OnBoardingSlide
            mainImg={item.mainImg}
            typography={item.typography}
            text={item.text}
            btnText={item.btnText}
            isEdge={item.isEdge}
            onSkipPress={item.onSkipPress}
            onNextPress={() => item.onNextPress(index + 1)}
          />
        );
      })}
    </Swiper>
  );
}
