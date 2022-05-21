import React, { useContext, useRef, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { OnBoardingSlide, OnBoardingStartEnd  } from 'components'
import { ImgOnBoarding1, ImgOnBoarding1Text, ImgOnBoarding2, ImgOnBoarding2Text, ImgOnBoarding3, ImgOnBoarding4, ImgOnBoarding4Text , ImgOnBoarding5, ImgOnBoarding5Text } from 'assets'
import { IsFirstContext } from 'context'




export function OnBoardingSwiper(){

  const [isStartOrEnd, setIsStartOrEnd] = useState(true)
  const { setFirst } = useContext(IsFirstContext);
  const swiperRef = useRef<Swiper>();

  const styles = StyleSheet.create({
    dot:{
        bottom: '7%',
    },
    disableDot : {
        bottom: '7%',
        display: 'none',
    },
  })

  const slide = [
    {
      mainImg: <ImgOnBoarding1 />,
      typography: <ImgOnBoarding1Text />,
      text: 'Welcome to YOGO',
      btnText: "Let's look into",
      isEdge: true,
      onNextPress: (index : number) => {
        swiperRef.current.scrollTo(index,true)
      }
    },
    {
      mainImg: <Image source={ImgOnBoarding2} style={{width: '100%', top: -100 }} resizeMode= 'contain' />,
      typography: <ImgOnBoarding2Text />,
      text: 'YOGO is a platform that connects you with the best local businesses',
      btnText: ['Next', 'Skip'],
      isEdge: false,
      onSkipPress: ()=> swiperRef.current.scrollTo(slide.length - 1,true),
      onNextPress: (index : number) => {
        swiperRef.current.scrollTo(index,true)
      }
    },
    {
      mainImg: <Image source={ImgOnBoarding3} style={{width: '100%', top : -40}} resizeMode= 'contain' />,
      typography: <ImgOnBoarding2Text />,
      text: 'YOGO is a platform that connects you with the best local businesses',
      btnText: ['Next', 'Skip'],
      isEdge: false,
      onSkipPress: ()=> swiperRef.current.scrollTo(slide.length - 1,true),
      onNextPress: (index : number) => {
        swiperRef.current.scrollTo(index,true)
      }
    },
    {
      mainImg: <Image source={ImgOnBoarding4} style={{width: '100%', top: -40}}  resizeMode= 'contain' />,
      typography: <ImgOnBoarding4Text />,
      text: 'YOGO is a platform that connects you with the best local businesses',
      btnText: ['Next', 'Skip'],
      isEdge: false,
      onSkipPress: ()=> swiperRef.current.scrollTo(slide.length - 1,true),
      onNextPress: (index : number) => {
        swiperRef.current.scrollTo(index,true)
      }
      },
      {
        mainImg: <ImgOnBoarding5 />,
        typography: <ImgOnBoarding5Text />,
        text: 'YOGO is a platform that connects you with the best local businesses',
        btnText: ['Next', 'Skip'],
        isEdge: false,
        onSkipPress: ()=> swiperRef.current.scrollTo(slide.length - 1,true),
        onNextPress: (index : number) => {
          swiperRef.current.scrollTo(index,true)
        }
      },
      {
        mainImg: <ImgOnBoarding5 />,
        typography: <ImgOnBoarding5Text />,
        text: 'YOGO is a platform that connects you with the best local businesses',
        btnText: 'Continue',
        isEdge: true,
        onNextPress: (index : number) => {
          swiperRef.current.scrollTo(index,true)
        }
      },
  ]

  const checkStartOrEnd = (index : number) => {
 
    if(index === 0 || index === 5){
      setIsStartOrEnd(true)
    }
    else{
      setIsStartOrEnd(false)
    }
  }

  
    return (
        <Swiper showsButtons={false}
         dotStyle={isStartOrEnd ? styles.disableDot : styles.dot} activeDotStyle={isStartOrEnd ? styles.disableDot : styles.dot} activeDotColor={'#ffffff'} loop={false}
         onIndexChanged ={checkStartOrEnd}
         ref={swiperRef}>
          {
            slide.map((item, index) => {
              return (
                <OnBoardingSlide
                  mainImg={item.mainImg}
                  typography={item.typography}
                  text={item.text}
                  btnText={item.btnText}
                  isEdge={item.isEdge}
                  onSkipPress={item.onSkipPress}
                  onNextPress={()=> item.onNextPress(index + 1)}
                />
              )
            }
          )}
      </Swiper>
    )
  }
