import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { OnBoardingSwiper } from 'components'
import { RootStackParamList } from 'types'

export function OnBoarding({ navigation } : { navigation :  NativeStackNavigationProp<RootStackParamList, 'OnBoarding'> }){
    return (
      <OnBoardingSwiper navigation={navigation} />
    )
  }
