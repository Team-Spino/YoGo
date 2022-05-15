import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { HandleScheduleTemplate } from 'components';
import { RootStackParamList } from 'types';


type Props = {
  navigation:  NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;
  route: RouteProp<RootStackParamList, 'HandleSchedule'>
};

export function HandleSchedule({ navigation, route }: Props) {
  //console.log(route); 라우트처리 가져옴 title이 make일때 사용하면 될것 같습니다
  return (
    <SafeAreaView>
      <HandleScheduleTemplate navigation={navigation} />
    </SafeAreaView>
  );
}
