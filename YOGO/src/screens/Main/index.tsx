import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, TimeZone } from 'components';
import { IconHome, IconTimeZone } from 'assets';

const Tab = createBottomTabNavigator();

export function Main() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: () => <IconHome />,
        }}
      />
      <Tab.Screen
        name="TimeZone"
        component={TimeZone}
        options={{
          title: 'TimeZone',
          tabBarIcon: () => <IconTimeZone />,
        }}
      />
    </Tab.Navigator>
  );
}
