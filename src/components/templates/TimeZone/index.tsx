import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, useTheme } from '@tamagui/core';
import {
  FloatingButton,
  TimeZoneList,
  BottomSheet,
  SearchTimeBottomSheet,
} from 'components';
import { IconSearch, IconPlus } from 'assets';
import { RootStackParamList } from 'types';
import { useTimezones } from 'hooks';
import { Screen, ScreenTitle, Eyebrow } from 'styles/ui';

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function TimeZone({ navigation }: { navigation: Prop }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { timezones, addTimezone, removeTimezone } = useTimezones();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [timeSearchVisible, setTimeSearchVisible] = useState<boolean>(false);

  return (
    <>
      <Screen>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          paddingHorizontal={20}
          paddingTop={insets.top + 8}
          paddingBottom={10}
        >
          <View>
            <Eyebrow>Compare across the world</Eyebrow>
            <ScreenTitle marginTop={2}>Time zones</ScreenTitle>
          </View>
          <Pressable
            onPress={() => setTimeSearchVisible(true)}
            hitSlop={10}
            style={({ pressed }) => ({ opacity: pressed ? 0.4 : 1 })}
          >
            <View
              width={40}
              height={40}
              borderRadius={999}
              backgroundColor="$backgroundStrong"
              alignItems="center"
              justifyContent="center"
            >
              <IconPlus color={theme.accent.val} />
            </View>
          </Pressable>
        </View>

        <TimeZoneList cardState={timezones} onDeleteTarget={removeTimezone} />

        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
        />
        <SearchTimeBottomSheet
          modalVisible={timeSearchVisible}
          setModalVisible={setTimeSearchVisible}
          selectTarget={addTimezone}
        />
      </Screen>
      <FloatingButton onPress={() => setModalVisible(true)}>
        <IconSearch color={theme.onAccent.val} />
      </FloatingButton>
    </>
  );
}
