import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnBoardingSwiper } from 'components';
import { RootStackParamList } from 'types';

export function OnBoarding({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnBoarding'>;
  route: any;
}) {
  console.log(route);
  const { setOnBoard } = route.params;
  return <OnBoardingSwiper setOnBoard={setOnBoard} />;
}
