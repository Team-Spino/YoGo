const mockExecuteSql = jest.fn();

// 저장소는 어떤 SQLite 라이브러리를 쓰는지 몰라야 합니다. connectDB 경계에서
// 목을 잡으면, op-sqlite로 갈아끼워도 이 테스트들은 그대로 통과합니다.
jest.mock('../connectDB', () => ({
  connectDB: jest.fn(() => Promise.resolve({ executeSql: mockExecuteSql })),
}));

import {
  addTimezone,
  findTimezones,
  removeTimezone,
} from '../timezoneRepository';

const emptyResult = [{ rows: { length: 0, item: jest.fn() }, insertId: 3 }];

describe('timezoneRepository', () => {
  beforeEach(() => {
    mockExecuteSql.mockReset();
    mockExecuteSql.mockResolvedValue(emptyResult);
  });

  it('adds a city as a bound parameter', async () => {
    await addTimezone("Africa/Dar_es_Salaam'; DROP TABLE timezone;--");

    const [sql, params] = mockExecuteSql.mock.calls[0];

    expect(sql).toContain('INSERT INTO timezone');
    expect(sql).not.toContain('DROP TABLE');
    expect(params).toEqual(["Africa/Dar_es_Salaam'; DROP TABLE timezone;--"]);
  });

  it('reads the saved cities', async () => {
    await findTimezones();

    const [sql] = mockExecuteSql.mock.calls[0];

    expect(sql).toContain('SELECT * FROM timezone');
  });

  it('removes a city by row id', async () => {
    await removeTimezone(4);

    const [sql, params] = mockExecuteSql.mock.calls[0];

    expect(sql).toContain('DELETE from timezone');
    expect(params).toEqual([4]);
  });
});
