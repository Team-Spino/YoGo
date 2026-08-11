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
import { Screen, Display, Eyebrow } from 'styles/ui';

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
          alignItems="flex-start"
          paddingHorizontal={20}
          paddingTop={insets.top + 14}
          paddingBottom={16}
        >
          <View flex={1}>
            <Display>World clock</Display>
            <Eyebrow marginTop={8}>
              {timezones.length === 0
                ? 'Add cities to compare'
                : `${timezones.length} ${
                    timezones.length === 1 ? 'city' : 'cities'
                  }`}
            </Eyebrow>
          </View>
          <Pressable
            onPress={() => setTimeSearchVisible(true)}
            hitSlop={10}
            style={({ pressed }) => ({ opacity: pressed ? 0.4 : 1 })}
          >
            <View
              width={44}
              height={44}
              borderRadius={999}
              backgroundColor="$ink"
              alignItems="center"
              justifyContent="center"
            >
              <IconPlus color={theme.onInk.val} />
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
        <IconSearch color={theme.onInk.val} />
      </FloatingButton>
    </>
  );
}
