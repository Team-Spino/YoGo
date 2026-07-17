import { IScheduleInput } from 'types';

const mockExecuteSql = jest.fn();

jest.mock('react-native-sqlite-storage', () => ({
  enablePromise: jest.fn(),
  openDatabase: jest.fn(() => Promise.resolve({ executeSql: mockExecuteSql })),
}));

import {
  addSchedule,
  findSchedulesByDay,
  removeSchedule,
  setScheduleActive,
} from '../scheduleRepository';

const scheduleInput: IScheduleInput = {
  title: "Mom's birthday",
  description: 'call her',
  tagColor: '#B5B5B9',
  targetTime: '09:00',
  targetCity: 'Asia/Seoul',
  targetDay: '2024-01-15',
  curTime: '00:00',
  curCity: 'UTC',
  curDay: '2024-01-15',
  dayOfWeek: '["Mon"]',
};

const emptyResult = [{ rows: { length: 0, item: jest.fn() }, insertId: 1 }];

describe('scheduleRepository', () => {
  beforeEach(() => {
    mockExecuteSql.mockReset();
    mockExecuteSql.mockResolvedValue(emptyResult);
  });

  it('adds a schedule without the caller handing over a connection', async () => {
    await addSchedule(scheduleInput);

    const [sql, params] = mockExecuteSql.mock.calls[0];

    expect(sql).toContain('INSERT INTO schedule');
    expect(params).toContain("Mom's birthday");
  });

  it('binds values as parameters instead of pasting them into the sql', async () => {
    await addSchedule(scheduleInput);

    const [sql, params] = mockExecuteSql.mock.calls[0];

    expect(sql).not.toContain("Mom's birthday");
    expect(params).toHaveLength(11);
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
