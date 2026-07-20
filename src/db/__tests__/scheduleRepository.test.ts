import { IScheduleInput } from 'types';

const mockExecuteSql = jest.fn();

// 저장소는 어떤 SQLite 라이브러리를 쓰는지 몰라야 합니다. connectDB 경계에서
// 목을 잡으면, op-sqlite로 갈아끼워도 이 테스트들은 그대로 통과합니다.
jest.mock('../connectDB', () => ({
  connectDB: jest.fn(() => Promise.resolve({ executeSql: mockExecuteSql })),
}));

import {
  addSchedule,
  editSchedule,
  findSchedulesByDay,
  removeSchedule,
  setScheduleActive,
} from '../scheduleRepository';

/**
 * 값을 하나도 겹치지 않게 둡니다.
 *
 * 같은 값이 두 자리에 있으면 그 둘을 뒤바꿔도 테스트가 통과해 버립니다.
 * 파라미터는 순서가 곧 어느 컬럼에 들어가는지라, 자리마다 값이 달라야
 * 뒤바뀐 것을 잡을 수 있습니다.
 */
const scheduleInput: IScheduleInput = {
  title: "Mom's birthday",
  description: 'call her',
  tagColor: '#EE7B70',
  targetTime: '09:00',
  targetCity: 'Asia/Seoul',
  targetDay: '2024-01-15',
  curTime: '19:30',
  curCity: 'America/New_York',
  curDay: '2024-01-14',
  dayOfWeek: '["Mon"]',
};

/** INSERT 문의 컬럼 순서와 정확히 같아야 합니다. */
const scheduleColumnOrder = [
  "Mom's birthday",
  'call her',
  '#EE7B70',
  '09:00',
  'Asia/Seoul',
  '2024-01-15',
  '19:30',
  'America/New_York',
  '2024-01-14',
  '["Mon"]',
];

const emptyResult = [{ rows: { length: 0, item: jest.fn() }, insertId: 1 }];

describe('scheduleRepository', () => {
  beforeEach(() => {
    mockExecuteSql.mockReset();
    mockExecuteSql.mockResolvedValue(emptyResult);
  });

  it('adds a schedule without the caller handing over a connection', async () => {
    await addSchedule(scheduleInput);

    const [sql] = mockExecuteSql.mock.calls[0];

    expect(sql).toContain('INSERT INTO schedule');
  });

  it('hands the values over in the order the columns are declared', async () => {
    await addSchedule(scheduleInput);

    const [, params] = mockExecuteSql.mock.calls[0];

    // 마지막 1은 IS_ACTIVE입니다. 새 일정은 켜진 채로 시작합니다.
    expect(params).toEqual([...scheduleColumnOrder, 1]);
  });

  it('binds values as parameters instead of pasting them into the sql', async () => {
    await addSchedule(scheduleInput);

    const [sql] = mockExecuteSql.mock.calls[0];

    expect(sql).not.toContain("Mom's birthday");
  });

  it('hands the values over in column order when editing too, with the key last', async () => {
    await editSchedule({ ...scheduleInput, key: 7, isActive: 0 });

    const [sql, params] = mockExecuteSql.mock.calls[0];

    expect(sql).toContain('UPDATE schedule SET');
    // IS_ACTIVE 다음의 7은 WHERE key입니다. 자리가 바뀌면 엉뚱한 행을 고칩니다.
    expect(params).toEqual([...scheduleColumnOrder, 0, 7]);
  });

  it('looks schedules up by day of week and date', async () => {
    await findSchedulesByDay('Mon', '2024-01-15');

    const [sql, params] = mockExecuteSql.mock.calls[0];

    expect(sql).toContain('SELECT * FROM schedule');
    expect(params).toEqual(['%Mon%', '%2024-01-15%']);
  });

  it('removes a schedule by key', async () => {
    await removeSchedule(7);

    const [sql, params] = mockExecuteSql.mock.calls[0];

    expect(sql).toContain('DELETE from schedule');
    expect(params).toEqual([7]);
  });

  it('toggles a schedule active flag by key', async () => {
    await setScheduleActive(7, 0);

    const [sql, params] = mockExecuteSql.mock.calls[0];

    expect(sql).toContain('SET IS_ACTIVE = ?');
    expect(params).toEqual([0, 7]);
  });
});
