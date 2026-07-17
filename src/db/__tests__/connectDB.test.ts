export {};

jest.mock('react-native-sqlite-storage', () => ({
  enablePromise: jest.fn(),
  openDatabase: jest.fn(),
}));

describe('connectDB', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('opens the database once and reuses it on later calls', async () => {
    const { openDatabase } = require('react-native-sqlite-storage');
    openDatabase.mockResolvedValue({ name: 'main.db' });

    const { connectDB } = require('../connectDB');

    const first = await connectDB();
    const second = await connectDB();

    expect(openDatabase).toHaveBeenCalledTimes(1);
    expect(first).toBe(second);
  });

  it('opens the database once when callers race', async () => {
    const { openDatabase } = require('react-native-sqlite-storage');
    openDatabase.mockResolvedValue({ name: 'main.db' });

    const { connectDB } = require('../connectDB');

    const [first, second] = await Promise.all([connectDB(), connectDB()]);

    expect(openDatabase).toHaveBeenCalledTimes(1);
    expect(first).toBe(second);
  });

  it('retries opening after a failure', async () => {
    const { openDatabase } = require('react-native-sqlite-storage');
    openDatabase
      .mockRejectedValueOnce(new Error('locked'))
      .mockResolvedValueOnce({ name: 'main.db' });

    const { connectDB } = require('../connectDB');

    await expect(connectDB()).rejects.toThrow('locked');

    const retried = await connectDB();

    expect(retried).toEqual({ name: 'main.db' });
    expect(openDatabase).toHaveBeenCalledTimes(2);
  });
});
