import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, TimeZone } from 'components';
import { useNotification } from 'hooks';
import { IconHome, IconTimeZone } from 'assets';

const Tab = createBottomTabNavigator();

export function Main() {
  const { handleNotificationPermission, handleNotificationBadge } =
    useNotification();

  useEffect(() => {
    handleNotificationPermission();
    handleNotificationBadge();
  }, []);

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
