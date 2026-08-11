import React, { useContext } from "react";
import { useColorScheme } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@tamagui/core';
import { Main, HandleSchedule, OnBoarding } from 'screens';
import { FirstLaunchContext } from 'context/firstLaunch';
import { RootStackParamList } from 'types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const {isFirstLaunch} = useContext(FirstLaunchContext);

  // 내비게이션이 소유한 표면(헤더/탭바/화면 배경)도 우리 테마를 따라가게 합니다.
  const theme = useTheme();
  const base = useColorScheme() === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: theme.accent.val,
      background: theme.background.val,
      card: theme.background.val,
      text: theme.color.val,
      border: theme.borderColor.val,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        {isFirstLaunch && (
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{
              headerShown: false,
            }}
          />
        )}
        {!isFirstLaunch && (
          <>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="HandleSchedule"
              component={HandleSchedule}
              options={({ route }) => ({
                title: route.params.title,
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
