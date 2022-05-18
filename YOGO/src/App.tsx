import React, {useEffect} from 'react';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Main, HandleSchedule } from 'screens';
import { theme } from 'styles/theme';
import { PopProvider } from 'context';

const Stack = createNativeStackNavigator();

function App() {

  useEffect(() => {
    PushNotificationIOS.requestPermissions();
  }, []);

  return (
    <NavigationContainer>
      <PopProvider>
        <ThemeProvider theme={theme}>
          <Stack.Navigator initialRouteName="Main">
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
          </Stack.Navigator>
        </ThemeProvider>
      </PopProvider>
    </NavigationContainer>
  );
}

export default App;
