import { LegacyDb } from 'db/connectDB';
import { ALARM_PERMISSION } from 'utils';

export const createAlarmPermissionTable = async (db: LegacyDb) => {
  const query = `
    CREATE TABLE IF NOT EXISTS ${ALARM_PERMISSION}
    (
        key INTEGER PRIMARY KEY AUTOINCREMENT,
        IS_AGREE INTEGER NOT NULL
    )
    `;

  await db.executeSql(query);
};

export const insertAlarmPermission = async (
  db: LegacyDb,
  isAgree: number,
) => {
  const query = `
    INSERT INTO ${ALARM_PERMISSION} (IS_AGREE)
    VALUES (?)
    `;

  await db.executeSql(query, [isAgree]);
};

export const getAlarmPermission = async (db: LegacyDb) => {
  try {
    const query = `
        SELECT * FROM ${ALARM_PERMISSION} WHERE key = 1
        `;

    const results = await db.executeSql(query);

    return results[0].rows.length ? results[0].rows.item(0) : false;
  } catch (e) {
    console.error(e);
    throw Error('Error in getAlarmPermission');
  }
};

export const updateAlarmPermission = async (
  db: LegacyDb,
  isAgree: number,
) => {
  try {
    const query = `
            UPDATE ${ALARM_PERMISSION} SET IS_AGREE = ? WHERE key = 1
            `;

    await db.executeSql(query, [isAgree]);
  } catch (e) {
    console.error(e);
    throw Error('Error in updateAlarmPermission');
  }
};
