import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import { BottomSheetBtn,  OnBoardingSlide } from 'components'
import { ImgOnBoarding1, ImgOnBoarding1Text } from 'assets'

const styles = StyleSheet.create({
    dot:{
        bottom: 40,
    },
    wrapper: {},
  })

export function OnBoardingSwiper(){
    return (
        <>
        <Swiper style={styles.wrapper} showsButtons={true} dotStyle={styles.dot} activeDotStyle={styles.dot}>
          <OnBoardingSlide 
            mainImg={<ImgOnBoarding1 />} 
            typography={<ImgOnBoarding1Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'SKIP'} />
         <OnBoardingSlide 
            mainImg={<ImgOnBoarding1 />} 
            typography={<ImgOnBoarding1Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'SKIP'} />
        <OnBoardingSlide 
            mainImg={<ImgOnBoarding1 />} 
            typography={<ImgOnBoarding1Text />} 
            text={'Make to easy set up different timezones meetings'} 
            btnText={'SKIP'} />
      </Swiper>
      </>
    )
  }
