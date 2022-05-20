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
  const [isFrist, setIsFrist] = React.useState(false);
  const KEY_VALUE = 'keyFirstLaunch';

// 키값에 true로 저장한다.
function setAppLaunched() {
  AsyncStorage.setItem(KEY_VALUE, 'true');
}

async function checkFirstLaunch() {
  try {
    const isFirstLaunched = await AsyncStorage.getItem(KEY_VALUE); 
    if (isFirstLaunched === null) {  
      setAppLaunched(); 
      return true; 
    }
    return false;  
  } catch (error) {
      console.log(' [chk first launch] :' + error);  
    return false;
  }
}

useEffect(() => {
  checkFirstLaunch().then(isFirst => {
    if (isFirst) {
      setIsFrist(true);
    } else {
      setIsFrist(false);
    }
  });
}, []);

  return (
    <NavigationContainer>
      <PopProvider>
        <IsFirstProvider>
        <ThemeProvider theme={theme}>
          <Stack.Navigator initialRouteName={`${!isFrist ? 'OnBoarding' : 'Main'}`}>
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
        </IsFirstProvider>
      </PopProvider>
    </NavigationContainer>
  );
}

export default App;
