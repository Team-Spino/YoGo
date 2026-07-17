import { connectDB } from 'db/connectDB';
import {
  createAlarmPermissionTable,
  getAlarmPermission,
  insertAlarmPermission,
  updateAlarmPermission,
} from 'db/alarmPermission';

/**
 * 알림 권한 저장소입니다.
 *
 * 커넥션을 여기서 다루므로, 훅과 컴포넌트는 DB를 열 필요가 없습니다.
 */

export const initAlarmPermissionTable = async () => {
  const db = await connectDB();

  await createAlarmPermissionTable(db);
};

export const findAlarmPermission = async () => {
  const db = await connectDB();

  return getAlarmPermission(db);
};

export const addAlarmPermission = async (isAgree: number) => {
  const db = await connectDB();

  await insertAlarmPermission(db, isAgree);
};

export const editAlarmPermission = async (isAgree: number) => {
  const db = await connectDB();

  await updateAlarmPermission(db, isAgree);
};
