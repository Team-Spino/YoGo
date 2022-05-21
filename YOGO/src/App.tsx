import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Main, HandleSchedule, OnBoarding } from 'screens';
import { theme } from 'styles/theme';
import { IsFirstProvider, PopProvider } from 'context';

const Stack = createNativeStackNavigator();

function App() {
  const [onBoard, setOnBoard] = React.useState(false);
  const KEY_VALUE = 'keyFirstLaunch';

function setAppLaunched() {
  AsyncStorage.setItem(KEY_VALUE, 'true');
}

async function checkFirstLaunch() {
  return new Promise(
   async (resolve) => { 
    try {
    const isFirstLaunched = await AsyncStorage.getItem(KEY_VALUE);
    console.log("키값",isFirstLaunched);
    if (isFirstLaunched === null) {   
      setAppLaunched(); 
      resolve(true);; 
    }
      resolve(false);  
  } catch (error) {
      console.log(' [chk first launch] :' + error);  
    resolve(false)
  }
}
  )
}

useEffect(() => {
  checkFirstLaunch().then( isFirst => {
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
          <Stack.Navigator initialRouteName={`${onBoard ? 'OnBoarding' : 'Main'}`}>
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
                title: route!.params.title as string,
              })}
            />
             <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              options={({ route }) => ({
                headerShown: false,
              })}
            />
          </Stack.Navigator>
        </ThemeProvider>
      </PopProvider>
    </NavigationContainer>
  );
}

export default App;
