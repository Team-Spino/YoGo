import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Detail } from 'screens';
import { useTimeZone } from 'hooks';

const Tab = createBottomTabNavigator();

function App() {
  console.log(useTimeZone());
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Detail} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
