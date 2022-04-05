import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Detail } from 'screens';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();


function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} options={{ title: '홈'}}/>
        <Tab.Screen name="Search" component={Detail} options={{ title: '홈',}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
