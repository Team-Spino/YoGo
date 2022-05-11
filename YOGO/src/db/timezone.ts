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
      CITY TEXT NOT NULL,
    );`;

  await db.executeSql(query);
};
