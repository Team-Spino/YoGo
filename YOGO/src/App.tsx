import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TimeZone, Home } from 'screens';
import { IconHome, IconTimeZone, IconPlus } from 'assets';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './styles/theme';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();
function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => <IconHome />,
            }}
          />
          <Tab.Screen
            name="Search"
            component={TimeZone}
            options={{
              title: 'TimeZone',
              tabBarIcon: ({ color, size }) => <IconTimeZone />,
            }}
          />
        </Tab.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
