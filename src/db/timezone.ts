import { enablePromise, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ICityProps } from 'types';
import { TIME_ZONE } from 'utils';

enablePromise(true);

export const createTimezoneTable = async (db: SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS ${TIME_ZONE}
    (
      key INTEGER PRIMARY KEY AUTOINCREMENT,
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
  const insertQuery = `INSERT INTO ${TIME_ZONE} (CITY) VALUES (?)`;

  const result = await db.executeSql(insertQuery, [city]);

  const { insertId } = result[0];
  return insertId;
};

export const deleteTimezoneItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${TIME_ZONE} where rowid = ?`;
  await db.executeSql(deleteQuery, [id]);
};

