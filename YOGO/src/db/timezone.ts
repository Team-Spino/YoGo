import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import { ICityProps } from 'types';
import { DB, TIME_ZONE } from 'utils';

enablePromise(true);

export const connectTimezoneDB = async () => {
  return openDatabase({ name: DB, location: 'default' });
};

export const createTimezoneTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${TIME_ZONE}
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      CITY TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getTimezoneItems = async (
  db: SQLiteDatabase,
): Promise<Array<ICityProps>> => {
  try {
    const timezoneItems: Array<ICityProps> = [];
    const results = await db.executeSql(`SELECT * FROM ${TIME_ZONE}`);

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        timezoneItems.push(result.rows.item(index));
      }
    });

    return timezoneItems as Array<ICityProps>;
  } catch (e: unknown) {
    console.error(e);
    throw Error('Error in getTimezoneItems');
  }
};

export const insertTimezoneItem = async (db: SQLiteDatabase, city: string) => {
  const insertQuery = `INSERT INTO ${TIME_ZONE} (CITY) VALUES ('${city}')`;

  const result = await db.executeSql(insertQuery);

  const { insertId } = result[0];
  return insertId;
};

export const deleteTimezoneItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${TIME_ZONE} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const dropTimezoneTable = async (db: SQLiteDatabase) => {
  const query = `DROP TABLE IF EXISTS ${TIME_ZONE}`;

  await db.executeSql(query);
};
