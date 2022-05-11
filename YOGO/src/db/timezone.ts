import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import { DB, TIME_ZONE } from 'utils';

enablePromise(true);

export const connectTimezoneDB = async () => {
  return openDatabase({ name: DB, location: 'default' });
};

export const createTimezoneTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS timezone 
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      CITY TEXT NOT NULL,
    );`;

  await db.executeSql(query);
};

export const getTimezoneItems = async (db: SQLiteDatabase) => {
  try {
    const timezoneItems: Array<string> = [];
    const results = await db.executeSql('SELECT * FROM timezone');

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        timezoneItems.push(result.rows.item(index));
      }
    });

    return timezoneItems;
  } catch (e: unknown) {
    console.error(e);
    throw Error('Error in getTimezoneItems');
  }
};
