import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  findScheduleDays,
  findSchedulesByDay,
  initScheduleTable,
  removeSchedule as removeScheduleFromDb,
} from 'db';
import { useNotification } from 'hooks/useNotification';
import { scheduleStore } from 'stores';
import {
  getDatesForWeekdays,
  parseToSlash,
  splitScheduleDays,
} from 'utils';
import { IScheduleProps } from 'types';

type MarkedDates = Record<string, { marked: true }>;

const weekdayOf = (day: string) =>
  new Date(parseToSlash(day)).toLocaleDateString('en', { weekday: 'short' });

const toMarkedDates = (days: Array<string>): MarkedDates =>
  days.reduce<MarkedDates>((marked, day) => {
    marked[day] = { marked: true };

    return marked;
  }, {});

/**
 * 선택한 날의 일정과, 일정이 있는 날 표시를 다룹니다.
 *
 * 화면은 목록·표시·삭제만 받습니다. 조회와 상태 관리는 여기 안에 있습니다.
 * 다른 화면에서 일정이 저장·수정되면 scheduleStore를 통해 다시 불러옵니다.
 */
export function useSchedules(selectedDay: string) {
  const [schedules, setSchedules] = useState<Array<IScheduleProps>>([]);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const { deleteAllNotification } = useNotification();

  const loadSchedules = useCallback(async () => {
    try {
      await initScheduleTable();

      setSchedules(
        await findSchedulesByDay(weekdayOf(selectedDay), selectedDay),
      );
    } catch (e) {
      console.error(e);
    }
  }, [selectedDay]);

  const loadMarkedDates = useCallback(async () => {
    const { dates, weekdays } = splitScheduleDays(await findScheduleDays());

    setMarkedDates(toMarkedDates([...dates, ...getDatesForWeekdays(weekdays)]));
  }, []);

  const reload = useCallback(() => {
    loadSchedules();
    loadMarkedDates();
  }, [loadSchedules, loadMarkedDates]);

  useEffect(() => {
    reload();
  }, [reload]);

  // 다른 화면에서 저장·수정·삭제가 일어나면 다시 불러옵니다.
  useEffect(() => scheduleStore.subscribe(reload), [reload]);

  const removeSchedule = useCallback(
    async (id: number) => {
      // 목록에서 먼저 빼야 화면이 바로 반응합니다.
      setSchedules(prev => prev.filter(item => item.key !== id));

      await removeScheduleFromDb(id);

      if (Platform.OS === 'ios') deleteAllNotification({ number: id });

      loadMarkedDates();
    },
    [deleteAllNotification, loadMarkedDates],
  );

  return { schedules, markedDates, removeSchedule };
}
