import { connectDB } from 'db/connectDB';
import {
  createTimezoneTable,
  deleteTimezoneItem,
  getTimezoneItems,
  insertTimezoneItem,
} from 'db/timezone';

/**
 * 타임존 카드 저장소입니다.
 *
 * 커넥션을 여기서 다루므로, 화면과 컴포넌트는 DB를 열 필요가 없습니다.
 */

export const initTimezoneTable = async () => {
  const db = await connectDB();

  await createTimezoneTable(db);
};

export const findTimezones = async () => {
  const db = await connectDB();

  return getTimezoneItems(db);
};

export const addTimezone = async (city: string) => {
  const db = await connectDB();

  return insertTimezoneItem(db, city);
};

export const removeTimezone = async (id: number) => {
  const db = await connectDB();

  await deleteTimezoneItem(db, id);
};
