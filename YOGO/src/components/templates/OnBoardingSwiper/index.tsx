import React, { useContext, useRef } from 'react'
import { Image, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { OnBoardingSlide, OnBoardingStartEnd  } from 'components'
import { ImgOnBoarding1, ImgOnBoarding1Text, ImgOnBoarding2, ImgOnBoarding2Text, ImgOnBoarding3, ImgOnBoarding4, ImgOnBoarding4Text , ImgOnBoarding5, ImgOnBoarding5Text } from 'assets'
import { IsFirstContext } from 'context'


const styles = StyleSheet.create({
    dot:{
        bottom: '7%',
        display: 'none'
    },
    arrow:{
      color: '#fff',
    },
    wrapper: {
    },
  })

export function OnBoardingSwiper(){

  const { setFirst } = useContext(IsFirstContext);
  const swiperRef = useRef();

    return (
        <Swiper style={styles.wrapper} showsButtons={false}
         dotStyle={styles.dot} activeDotStyle={styles.dot} activeDotColor={'#ffffff'} loop={false}
        ref={swiperRef} index={0}>
          < OnBoardingStartEnd
            mainImg={<ImgOnBoarding1 />} 
            typography={<ImgOnBoarding1Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'Next'}
            onPress={() => {
              swiperRef.current.scrollTo(1,true)
            }}
            />
         <OnBoardingSlide 
            mainImg={<Image style={{
              width: '100%',
              top: -100,
              }}
              resizeMode='contain'
              source={ImgOnBoarding2}/>} 
            typography={<ImgOnBoarding2Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'SKIP'}
            onSkipPress={() => {
              swiperRef.current.scrollTo(5,true)
            }}
            onNextPress={() => {
              swiperRef.current.scrollTo(2,true)
            }}
            />
          <OnBoardingSlide 
            mainImg={<Image style={{
              width: '100%',
              top: -40,
              }}
              resizeMode='contain'
              source={ImgOnBoarding3}/>} 
            typography={<ImgOnBoarding2Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'SKIP'}
            onSkipPress={() => {
              swiperRef.current.scrollTo(5,true)
            }}
            onNextPress={() => {
              swiperRef.current.scrollTo(3,true)
            }}
            />
          <OnBoardingSlide 
            mainImg={<Image style={{
              width: '95%',
              top: -40,
              }}
              resizeMode='contain'
              source={ImgOnBoarding4}/>} 
            typography={<ImgOnBoarding4Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'SKIP'}
            onSkipPress={() => {
              swiperRef.current.scrollTo(5,true)
            }}
            onNextPress={() => {
              swiperRef.current.scrollTo(4,true)
            }}
            />
          <OnBoardingSlide 
            isEnd={true}
            mainImg={<ImgOnBoarding5 />} 
            typography={<ImgOnBoarding5Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'SKIP'} 
            onSkipPress={() => {
              swiperRef.current.scrollTo(5,true)
            }}
            onNextPress={() => {
              swiperRef.current.scrollTo(5,true)
            }}
            />
          < OnBoardingStartEnd
            isEnd={true}
            mainImg={<ImgOnBoarding5 />} 
            typography={<ImgOnBoarding5Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'Get Started'} 
            onPress={() => {
              setFirst(true);
            }}
            />
      </Swiper>
    )
  }
