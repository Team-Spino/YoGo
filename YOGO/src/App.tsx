import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main, HandleSchedule } from 'screens';
import { theme } from 'styles/theme';
import { DUMMY_TIME_ZONE } from 'utils';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
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
              title: route!.params.title as string,
            })}
          />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
