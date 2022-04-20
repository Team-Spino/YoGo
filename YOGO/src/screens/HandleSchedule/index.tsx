import React from 'react';
import { SafeAreaView } from 'react-native';
import { HandleScheduleTemplate } from 'components';

export function HandleSchedule({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView>
      <HandleScheduleTemplate navigation={navigation} />
    </SafeAreaView>
  );
}
