import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main, HandleSchedule, OnBoarding } from 'screens';
import { FirstLaunchContext } from 'context/firstLaunch';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const {isFirstLaunch} = useContext(FirstLaunchContext);

  return (
    <NavigationContainer>
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
                title: route!.params!.title as string,
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
