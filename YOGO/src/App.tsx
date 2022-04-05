import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Detail } from 'screens';
import IconHome from './assets/icons/IconHome';
import IconTimeZone from './assets/icons/IconTimeZone';



const Tab = createBottomTabNavigator();


function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} options={{ title: '홈',  tabBarIcon: ({ color, size }) => (
            <IconHome />
          ),}} />
        <Tab.Screen name="Search" component={Detail} options={{ title: 'TimeZone', tabBarIcon: ({ color, size }) => (
            <IconTimeZone />
          ),}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
