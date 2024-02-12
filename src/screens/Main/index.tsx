import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, TimeZone } from 'components';
import { useNotification } from 'hooks';
import { IconHome, IconTimeZone } from 'assets';

const Tab = createBottomTabNavigator();

export function Main() {
  const { handleNotificationPermission, handleNotificationBadge } =
    useNotification();

  useEffect(() => {
    if (Platform.OS === 'ios') {      
      handleNotificationPermission();
      handleNotificationBadge();
    }
  }, []);

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
      tabBarActiveTintColor: '#6564CC',
    }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <IconHome color={color} />,
          tabBarActiveTintColor: '#6564CC',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="TimeZone"
        component={TimeZone}
        options={{
          title: 'TimeZone',
          tabBarIcon: ({ color, size }) => <IconTimeZone color={color}  />,
          tabBarActiveTintColor: '#6564CC',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}
