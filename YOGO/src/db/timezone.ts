import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

export const connectDBTimezone = async () => {
  return openDatabase({ name: 'timezone.db', location: 'default' });
};
