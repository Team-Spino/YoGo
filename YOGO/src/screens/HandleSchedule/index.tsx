import React from 'react';
import { SafeAreaView } from 'react-native';
import { HandleScheduleTemplate } from 'components';
import { IHandelScheduleProps } from 'types';

export function HandleSchedule({ navigation, route }: IHandelScheduleProps) {
  return (
    <SafeAreaView>
      <HandleScheduleTemplate navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
