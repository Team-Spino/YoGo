export {};

// op-sqlite의 open은 동기 함수입니다(예전 sqlite-storage의 openDatabase처럼
// Promise를 돌려주지 않습니다). 커넥션을 한 번만 열고 재사용하는지,
// 실패하면 캐시를 비워 다음 호출이 다시 시도하는지 확인합니다.
jest.mock('@op-engineering/op-sqlite', () => ({
  open: jest.fn(),
}));

describe('connectDB', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('opens the database once and reuses it on later calls', async () => {
    const { open } = require('@op-engineering/op-sqlite');
    open.mockReturnValue({ execute: jest.fn() });

    const { connectDB } = require('../connectDB');

    const first = await connectDB();
    const second = await connectDB();

    expect(open).toHaveBeenCalledTimes(1);
    expect(first).toBe(second);
  });

  it('opens the database once when callers race', async () => {
    const { open } = require('@op-engineering/op-sqlite');
    open.mockReturnValue({ execute: jest.fn() });

    const { connectDB } = require('../connectDB');

    const [first, second] = await Promise.all([connectDB(), connectDB()]);

    expect(open).toHaveBeenCalledTimes(1);
    expect(first).toBe(second);
  });

  it('retries opening after a failure', async () => {
    const { open } = require('@op-engineering/op-sqlite');
    open
      .mockImplementationOnce(() => {
        throw new Error('locked');
      })
      .mockReturnValueOnce({ execute: jest.fn() });

    const { connectDB } = require('../connectDB');

    await expect(connectDB()).rejects.toThrow('locked');

    const retried = await connectDB();

    expect(retried).toHaveProperty('executeSql');
    expect(open).toHaveBeenCalledTimes(2);
  });
});
