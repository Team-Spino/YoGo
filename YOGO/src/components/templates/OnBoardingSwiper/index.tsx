import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { OnBoardingSlide  } from 'components'
import { ImgOnBoarding1, ImgOnBoarding1Text, ImgOnBoarding2, ImgOnBoarding2Text, ImgOnBoarding3, ImgOnBoarding4, ImgOnBoarding4Text , ImgOnBoarding5, ImgOnBoarding5Text } from 'assets'


const styles = StyleSheet.create({
    dot:{
        bottom: 45,
    },
    arrow:{
      color: '#fff',
    },
    wrapper: {
    },
  })

export function OnBoardingSwiper(){
    return (
        <>
        <Swiper style={styles.wrapper} showsButtons={false} dotStyle={styles.dot} activeDotStyle={styles.dot} activeDotColor={'#ffffff'} loop={false}  >
          <OnBoardingSlide 
            mainImg={<ImgOnBoarding1 />} 
            typography={<ImgOnBoarding1Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'Continue'} />
         <OnBoardingSlide 
            mainImg={<Image style={{
              width: '100%',
              top: -100,
              }}
              resizeMode='contain'
              source={ImgOnBoarding2}/>} 
            typography={<ImgOnBoarding2Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'SKIP'} />
          <OnBoardingSlide 
            mainImg={<Image style={{
              width: '100%',
              top: -40,
              }}
              resizeMode='contain'
              source={ImgOnBoarding3}/>} 
            typography={<ImgOnBoarding2Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'SKIP'} />
          <OnBoardingSlide 
            mainImg={<Image style={{
              width: '95%',
              top: -40,
              }}
              resizeMode='contain'
              source={ImgOnBoarding4}/>} 
            typography={<ImgOnBoarding4Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'SKIP'} />
          <OnBoardingSlide 
            isEnd={true}
            mainImg={<ImgOnBoarding5 />} 
            typography={<ImgOnBoarding5Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'Get Started'} />
      </Swiper>
      </>
    )
  }
