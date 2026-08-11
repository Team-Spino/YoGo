import { IScheduleInput, IScheduleUpdate } from 'types';
import { connectDB } from 'db/connectDB';
import {
  createScheduleTable,
  deleteScheduleItem,
  getDateAndDayOfWeek,
  getScheduleItems,
  insertScheduleItem,
  updateAllSchedule,
  updateScheduleItemActive,
} from 'db/schedule';

/**
 * 일정 저장소입니다.
 *
 * 커넥션을 여기서 다루므로, 화면과 컴포넌트는 DB를 열 필요가 없습니다.
 */

export const initScheduleTable = async () => {
  const db = await connectDB();

  await createScheduleTable(db);
};

export const findSchedulesByDay = async (
  dayOfWeek: string,
  curDay: string,
) => {
  const db = await connectDB();

  return getScheduleItems(db, dayOfWeek, curDay);
};

export const findScheduleDays = async () => {
  const db = await connectDB();

  return getDateAndDayOfWeek(db);
};

export const addSchedule = async (schedule: IScheduleInput) => {
  const db = await connectDB();

  return insertScheduleItem(db, schedule);
};

export const editSchedule = async (schedule: IScheduleUpdate) => {
  const db = await connectDB();

  await updateAllSchedule(db, schedule);
};

export const removeSchedule = async (id: number) => {
  const db = await connectDB();

  await deleteScheduleItem(db, id);
};

export const setScheduleActive = async (id: number, isActive: number) => {
  const db = await connectDB();

  await updateScheduleItemActive(db, id, isActive);
};
