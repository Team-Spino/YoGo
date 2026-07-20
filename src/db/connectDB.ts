import { open, DB as OpSqliteDb } from '@op-engineering/op-sqlite';
import { DB } from 'utils';

/**
 * op-sqlite를 예전 react-native-sqlite-storage와 같은 모양으로 감쌉니다.
 *
 * op-sqlite는 `db.execute(sql, params)`가 `{ rows: [...] }`(배열)를 돌려주는데,
 * 우리 원시 db 함수들은 sqlite-storage의 `db.executeSql(sql, params)` →
 * `[{ rows: { length, item(i) } }]` 모양에 맞춰져 있습니다. 여기서 형태만
 * 변환해 두면, 원시 함수·저장소·훅·테스트는 한 줄도 바꾸지 않아도 됩니다.
 */
export interface LegacyResultSet {
  rows: {
    length: number;
    item: (index: number) => any;
  };
  insertId?: number;
  rowsAffected: number;
}

export interface LegacyDb {
  executeSql: (
    sql: string,
    params?: Array<unknown>,
  ) => Promise<Array<LegacyResultSet>>;
}

const adapt = (db: OpSqliteDb): LegacyDb => ({
  executeSql: async (sql, params = []) => {
    const result = await db.execute(sql, params as never);
    const rows = result.rows ?? [];

    return [
      {
        rows: {
          length: rows.length,
          item: (index: number) => rows[index],
        },
        insertId: result.insertId,
        rowsAffected: result.rowsAffected,
      },
    ];
  },
});

let connection: LegacyDb | null = null;

/**
 * 앱 전체가 커넥션 하나를 공유합니다.
 *
 * 화면을 열거나 카드를 토글할 때마다 DB를 새로 열던 것을 막습니다.
 * 열기에 실패하면 캐시를 비워, 다음 호출이 다시 시도할 수 있게 합니다.
 */
export const connectDB = async (): Promise<LegacyDb> => {
  if (!connection) {
    try {
      connection = adapt(open({ name: DB }));
    } catch (e) {
      connection = null;
      throw e;
    }
  }

  return connection;
};
