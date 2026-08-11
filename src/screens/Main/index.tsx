import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@tamagui/core';
import { Home, TimeZone } from 'components';
import { useNotification } from 'hooks';
import { IconHome, IconTimeZone } from 'assets';

const Tab = createBottomTabNavigator();

export function Main() {
  const { handleNotificationPermission, handleNotificationBadge } =
    useNotification();
  const theme = useTheme();

  useEffect(() => {
    if (Platform.OS !== 'ios') return;

    handleNotificationPermission();

    return handleNotificationBadge();
  }, []);

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
      tabBarActiveTintColor: theme.accent.val,
    }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <IconHome color={color} />,
          tabBarActiveTintColor: theme.accent.val,
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
          headerShown: false,
          title: 'TimeZone',
          tabBarIcon: ({ color }) => <IconTimeZone color={color} />,
          tabBarActiveTintColor: theme.accent.val,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}
