import { enablePromise, SQLiteDatabase } from 'react-native-sqlite-storage';
import { SCHEDULE } from 'utils';
import { IScheduleProps } from 'types';

enablePromise(true);

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
    TARGET_DAY TEXT NOT NULL,
    CUR_TIME TEXT NOT NULL,
    CUR_CITY TEXT NOT NULL,
    CUR_DAY TEXT NOT NULL,
    DAY_OF_WEEK TEXT NOT NULL
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
      WHERE ( DAY_OF_WEEK LIKE "%${dayOfWeek}%" 
      OR CUR_DAY LIKE "%${curDay}%" )
      ORDER BY CUR_TIME ASC
    `;

    const results = await db.executeSql(query);

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

export const insertScheduleItem = async (db: SQLiteDatabase, schedule: any) => {
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

  const insertQuery = `
    INSERT INTO ${SCHEDULE} (TITLE, DESCRIPTION, TAG_COLOR, TARGET_TIME, TARGET_CITY, TARGET_DAY, CUR_TIME, CUR_CITY, CUR_DAY, DAY_OF_WEEK)
    VALUES (
      '${title}', 
      '${description}', 
      '${tagColor}', 
      '${targetTime}', 
      '${targetCity}',
      '${targetDay}',
      '${curTime}', 
      '${curCity}',
      '${curDay}',
      '${dayOfWeek}'
      )
  `;

  const result = await db.executeSql(insertQuery);

  const { insertId } = result[0];
  return insertId;
};

export const deleteScheduleItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${SCHEDULE} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const dropScheduleTable = async (db: SQLiteDatabase) => {
  const query = `DROP TABLE IF EXISTS ${SCHEDULE}`;

  await db.executeSql(query);
};