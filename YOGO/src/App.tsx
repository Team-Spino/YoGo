import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TimeZone, Detail } from 'screens';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './styles/theme';

const Tab = createBottomTabNavigator();
function App() {
  return (
 
    <NavigationContainer>
     <ThemeProvider theme={theme}>
      <Tab.Navigator initialRouteName="TimeZone">
        <Tab.Screen name="TimeZone" component={TimeZone} />
        <Tab.Screen name="Search" component={Detail} />
      </Tab.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
