import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import { BottomSheetBtn } from 'components'
import { ImgOnBoarding1 } from 'assets'

const styles = StyleSheet.create({
    dot:{
        bottom: 40,
    },
    wrapper: {},
    slide1: {
      flex: 1,
      position: 'relative',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#6564CC'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  })

export function OnBoardingSwiper(){
    return (
        <>
        <Swiper style={styles.wrapper} showsButtons={true} dotStyle={styles.dot} activeDotStyle={styles.dot}>
        <View style={styles.slide1}>
            
          <Text style={styles.text}>Hello Swiper</Text>
          <ImgOnBoarding1 />
         <BottomSheetBtn text={'skip'} onPress={function (): void {
                        throw new Error('Function not implemented.')
                    } } isRevers={true} />
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
      </>
    )
  }
