import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import { HandleScheduleTemplate } from 'components';
import { RootStackParamList } from 'types';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function HandleSchedule({ navigation }: { navigation: Prop }) {
  return (
    <SafeAreaView>
      <HandleScheduleTemplate navigation={navigation} />
    </SafeAreaView>
  );
}
