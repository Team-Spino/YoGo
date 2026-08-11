/**
 * db 모듈의 공개 API는 저장소(repository)입니다.
 *
 * 화면과 컴포넌트는 커넥션을 직접 열지 않고 아래 함수만 씁니다.
 * 원시 SQL 함수는 각 저장소 안에서만 쓰입니다.
 */

export {
  initScheduleTable,
  findSchedulesByDay,
  findScheduleDays,
  addSchedule,
  editSchedule,
  removeSchedule,
  setScheduleActive,
} from 'db/scheduleRepository';

export {
  initTimezoneTable,
  findTimezones,
  addTimezone,
  removeTimezone,
} from 'db/timezoneRepository';

export {
  initAlarmPermissionTable,
  findAlarmPermission,
  addAlarmPermission,
  editAlarmPermission,
} from 'db/alarmPermissionRepository';
