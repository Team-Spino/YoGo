import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

export const connectTimezoneDB = async () => {
  return openDatabase({ name: 'main.db', location: 'default' });
};

export const createTimezoneTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS timezone 
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      TIME TEXT NOT NULL,
      DATE TEXT NOT NULL,
      CITY TEXT NOT NULL,
      MERIDIEM TEXT NOT NULL,
      TIMEDIFFERENCE TEXT NOT NULL
    );`;

  await db.executeSql(query);
};
