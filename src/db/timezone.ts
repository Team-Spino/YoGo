import { LegacyDb } from 'db/connectDB';
import { ICityProps } from 'types';
import { TIME_ZONE } from 'utils';

export const createTimezoneTable = async (db: LegacyDb) => {
  const query = `
    CREATE TABLE IF NOT EXISTS ${TIME_ZONE}
    (
      key INTEGER PRIMARY KEY AUTOINCREMENT,
      CITY TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getTimezoneItems = async (
  db: LegacyDb,
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

export const insertTimezoneItem = async (db: LegacyDb, city: string) => {
  const insertQuery = `INSERT INTO ${TIME_ZONE} (CITY) VALUES (?)`;

  const result = await db.executeSql(insertQuery, [city]);

  const { insertId } = result[0];
  return insertId;
};

export const deleteTimezoneItem = async (db: LegacyDb, id: number) => {
  const deleteQuery = `DELETE from ${TIME_ZONE} where rowid = ?`;
  await db.executeSql(deleteQuery, [id]);
};

