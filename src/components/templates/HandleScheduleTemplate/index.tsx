import React from 'react';
import { View } from '@tamagui/core';
import { SettingSchedule } from 'components';
import { IHandelScheduleProps} from 'types';

export function HandleScheduleTemplate({ navigation, route }: IHandelScheduleProps) {
  return (
    <View
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <SettingSchedule navigation={navigation} route={route} />
    </View>
  );
}
