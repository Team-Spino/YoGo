import React, { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Main, HandleSchedule } from 'screens';
import {
  connectDB,
  createAlarmPermissionTable,
  inesertAlarmPermission,
  getAlarmPermission,
  updateAlarmPermission,
  deleteAlarmPermission,
} from 'db';
import { theme } from 'styles/theme';
import { PopProvider } from 'context';

const Stack = createNativeStackNavigator();

function App() {
  const notificationLogic = async () => {
    await PushNotificationIOS.requestPermissions();
    PushNotificationIOS.setApplicationIconBadgeNumber(0);

    PushNotificationIOS.checkPermissions(async info => {
      const db = await connectDB();

      await createAlarmPermissionTable(db);

      const permission = await getAlarmPermission(db);

      // 알람이 허가되었고, db에 반영되지 않았을 때
      if (info.notificationCenter && !permission) {
        await inesertAlarmPermission(db, 1);
        return;
      }

      // 알람이 허가 되었고, db에 isAgree가 0일때 -> db에 업데이트
      if (info.notificationCenter && !permission.IS_AGREE) {
        await updateAlarmPermission(db, 1);
      }

      // 알람이 허가되었고, db에 active 되었을 때
      if (info.notificationCenter && permission.IS_AGREE) return;

      // 알람이 허가되지 않았고, db에 반영되지 않았을 때
      if (!info.notificationCenter && !permission) {
        Alert.alert('YOGO', 'Please use Notification', [
          {
            text: 'Cancel',
            onPress: async () => {
              await inesertAlarmPermission(db, 0);
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]);

        return;
      }
    });
  };
  useEffect(() => {
    notificationLogic();
  }, []);

  return (
    <NavigationContainer>
      <PopProvider>
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
                title: route!.params!.title as string,
              })}
            />
          </Stack.Navigator>
        </ThemeProvider>
      </PopProvider>
    </NavigationContainer>
  );
}

export default App;
