import { enablePromise, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ALARM_PERMISSION } from 'utils';

enablePromise(true);

export const createAlarmPermissionTable = async (db: SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS ${ALARM_PERMISSION}
    (
        key INTEGER PRIMARY KEY AUTOINCREMENT,
        IS_AGREE INTEGER NOT NULL
    )
    `;

  await db.executeSql(query);
};

export const inesertAlarmPermission = async (
  db: SQLiteDatabase,
  isAgree: number,
) => {
  const query = `
    INSERT INTO ${ALARM_PERMISSION} (IS_AGREE)
    VALUES (${isAgree})
    `;

  await db.executeSql(query);
};

export const getAlarmPermission = async (db: SQLiteDatabase) => {
  try {
    const query = `
        SELECT * FROM ${ALARM_PERMISSION} WHERE key = 1
        `;

    const results = await db.executeSql(query);

    console.log(results[0]);

    return results[0].rows.length ? results[0].rows.item(0) : false;
  } catch (e) {
    console.error(e);
    throw Error('Error in getAlarmPermission');
  }
};

export const deleteAlarmPermission = async (db: SQLiteDatabase) => {
  const query = `
        DELETE FROM ${ALARM_PERMISSION} WHERE key = 1
        `;

  await db.executeSql(query);
};

export const updateAlarmPermission = async (
  db: SQLiteDatabase,
  isAgree: number,
) => {
  try {
    const query = `
            UPDATE ${ALARM_PERMISSION} SET IS_AGREE = ${isAgree} WHERE key = 1
            `;

    await db.executeSql(query);
  } catch (e) {
    console.error(e);
    throw Error('Error in updateAlarmPermission');
  }
};
