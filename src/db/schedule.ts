import { enablePromise, SQLiteDatabase } from 'react-native-sqlite-storage';
import { SCHEDULE } from 'utils';
import { IScheduleInput, IScheduleProps, IScheduleUpdate } from 'types';

enablePromise(true);

export const createScheduleTable = async (db: SQLiteDatabase) => {
  const query = `
  CREATE TABLE IF NOT EXISTS ${SCHEDULE}
  (
    key INTEGER PRIMARY KEY AUTOINCREMENT,
    TITLE TEXT NOT NULL,
    DESCRIPTION TEXT,
    TAG_COLOR TEXT,
    TARGET_TIME TEXT NOT NULL,
    TARGET_CITY TEXT NOT NULL,
    TARGET_DAY TEXT NOT NULL,
    CUR_TIME TEXT NOT NULL,
    CUR_CITY TEXT NOT NULL,
    CUR_DAY TEXT NOT NULL,
    DAY_OF_WEEK TEXT NOT NULL,
    IS_ACTIVE INTEGER NOT NULL
  )
  `;

  await db.executeSql(query);
};

export const getScheduleItems = async (
  db: SQLiteDatabase,
  dayOfWeek: string,
  curDay: string,
) => {
  try {
    const scheduleItems: Array<IScheduleProps> = [];
    const query = `
      SELECT * FROM ${SCHEDULE}
      WHERE ( DAY_OF_WEEK LIKE ?
      OR CUR_DAY LIKE ? )
      ORDER BY CUR_TIME ASC
    `;

    const results = await db.executeSql(query, [
      `%${dayOfWeek}%`,
      `%${curDay}%`,
    ]);

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        scheduleItems.push(result.rows.item(index));
      }
    });

    return scheduleItems;
  } catch (e: unknown) {
    console.error(e);
    throw Error('Error in getScheduleItems');
  }
};

export const insertScheduleItem = async (
  db: SQLiteDatabase,
  schedule: IScheduleInput,
) => {
  const {
    title,
    description,
    tagColor,
    targetTime,
    targetDay,
    targetCity,
    curTime,
    curDay,
    curCity,
    dayOfWeek,
  } = schedule;

  try {
    const insertQuery = `
    INSERT INTO ${SCHEDULE} (TITLE, DESCRIPTION, TAG_COLOR, TARGET_TIME, TARGET_CITY, TARGET_DAY, CUR_TIME, CUR_CITY, CUR_DAY, DAY_OF_WEEK, IS_ACTIVE)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const result = await db.executeSql(insertQuery, [
      title,
      description,
      tagColor,
      targetTime,
      targetCity,
      targetDay,
      curTime,
      curCity,
      curDay,
      dayOfWeek,
      1,
    ]);

    const { insertId } = result[0];

    return insertId;
  } catch (e) {
    console.error(e);
  }
};

export const deleteScheduleItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${SCHEDULE} WHERE key = ?`;
  await db.executeSql(deleteQuery, [id]);
};

export const updateScheduleItemActive = async (
  db: SQLiteDatabase,
  id: number,
  isActive: number,
) => {
  const updateQuery = `UPDATE ${SCHEDULE} SET IS_ACTIVE = ? WHERE key = ?`;
  await db.executeSql(updateQuery, [isActive, id]);
};

export const updateAllSchedule = async (
  db: SQLiteDatabase,
  schedule: IScheduleUpdate,
) => {
  const {
    key,
    title,
    description,
    tagColor,
    targetTime,
    targetCity,
    targetDay,
    curTime,
    curCity,
    curDay,
    dayOfWeek,
    isActive,
  } = schedule;

  const updateQuery = `UPDATE ${SCHEDULE} SET TITLE = ?, DESCRIPTION = ?, TAG_COLOR = ?, TARGET_TIME = ?, TARGET_CITY = ?, TARGET_DAY = ?, CUR_TIME = ?, CUR_CITY = ?, CUR_DAY = ?, DAY_OF_WEEK = ?, IS_ACTIVE = ? WHERE key = ?`;

  await db.executeSql(updateQuery, [
    title,
    description,
    tagColor,
    targetTime,
    targetCity,
    targetDay,
    curTime,
    curCity,
    curDay,
    dayOfWeek,
    isActive,
    key,
  ]);
};

export const getDateAndDayOfWeek = async (db: SQLiteDatabase) => {
  try {
    const dateAndDayOfWeek: Array<{ result: string }> = [];
    const query = `
      SELECT case when(DAY_OF_WEEK = '[]') then ${SCHEDULE}.CUR_DAY else ${SCHEDULE}.DAY_OF_WEEK end AS result FROM ${SCHEDULE}
    `;

    const results = await db.executeSql(query);

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        dateAndDayOfWeek.push(result.rows.item(index));
      }
    });

    return dateAndDayOfWeek;
  } catch (e: unknown) {
    console.error(e);
    throw Error('Error in getScheduleItems');
  }
};
