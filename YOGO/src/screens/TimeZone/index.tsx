import React from 'react';
import { TimeZoneList } from 'components';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { IconPlus } from 'assets';
import { HeaderRightButton } from 'components';
import * as S from './style';

export function TimeZone() {
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => <HeaderRightButton></HeaderRightButton>,
  });
  return <TimeZoneList></TimeZoneList>;
}
