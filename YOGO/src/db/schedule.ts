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

export const createScheduleTable = async (db: SQLiteDatabase) => {
  const query = `
  CREATE TABLE IF NOT EXISTS ${SCHEDULE}
  (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    TITLE TEXT NOT NULL,
    DESCRIPTION TEXT,
    TAG_COLOR TEXT,
    TARGET_TIME TEXT NOT NULL,
    TARGET_CITY TEXT NOT NULL,
    CUR_TIME TEXT NOT NULL,
    CUR_CITY TEXT NOT NULL,
    DAY_OF_WEEK TEXT NOT NULL,
  )
  `;

  await db.executeSql(query);
};

export const getScheduleAllItems = async (
  db: SQLiteDatabase,
  dayOfWeek: string,
) => {
  try {
  } catch (e: unknown) {
    console.error(e);
    throw Error('Error in getScheduleItems');
  }
};
