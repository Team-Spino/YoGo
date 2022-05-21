import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Main, HandleSchedule, OnBoarding } from 'screens';
import { theme } from 'styles/theme';
import { PopProvider } from 'context';

const Stack = createNativeStackNavigator();

function App() {
  const [onBoard, setOnBoard] = useState(true);
  const KEY_VALUE = 'keyFirstLaunch';

  async function checkFirstLaunch() {
    return new Promise(async resolve => {
      try {
        const isFirstLaunched = await AsyncStorage.getItem(KEY_VALUE);

        if (isFirstLaunched === null) resolve(true);
        resolve(false);
      } catch (error) {
        console.log(' [chk first launch] :' + error);
        resolve(false);
      }
    });
  }

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  useEffect(() => {
    checkFirstLaunch().then(isFirst => {
      if (isFirst) {
        setOnBoard(true);
      } else {
        setOnBoard(false);
      }
    });
  }, [setOnBoard]);

  return (
    <NavigationContainer>
      <PopProvider>
        <ThemeProvider theme={theme}>
          <Stack.Navigator>
            {onBoard && (
              <Stack.Screen
                name="OnBoarding"
                component={OnBoarding}
                options={{
                  headerShown: false,
                }}
                initialParams={{ setOnBoard }}
              />
            )}
            {!onBoard && (
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
        </ThemeProvider>
      </PopProvider>
    </NavigationContainer>
  );
}

export default App;
