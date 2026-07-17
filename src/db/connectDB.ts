import {
  openDatabase,
  enablePromise,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import { DB } from 'utils';

enablePromise(true);

let connection: Promise<SQLiteDatabase> | null = null;

/**
 * 앱 전체가 커넥션 하나를 공유합니다.
 *
 * 화면을 열거나 카드를 토글할 때마다 DB를 새로 열던 것을 막습니다.
 * 열기에 실패하면 캐시를 비워, 다음 호출이 다시 시도할 수 있게 합니다.
 */
export const connectDB = (): Promise<SQLiteDatabase> => {
  if (!connection) {
    connection = openDatabase({ name: DB, location: 'default' });

    connection.catch(() => {
      connection = null;
    });
  }

  return connection;
};
