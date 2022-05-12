import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import { DB, SCHEDULE } from 'utils';

enablePromise(true);

export const connectScheduleDB = async () => {
  return openDatabase({ name: DB, location: 'default' });
};

export const createScheduleTable = async (db: SQLiteDatabase) => {};
