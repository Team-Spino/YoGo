import { useCallback, useEffect, useState } from 'react';
import {
  addTimezone as addTimezoneToDb,
  findTimezones,
  initTimezoneTable,
  removeTimezone as removeTimezoneFromDb,
} from 'db';
import { ICityProps } from 'types';

/**
 * 타임존 카드 목록을 다룹니다.
 *
 * 화면은 목록과 액션만 받습니다. 테이블 준비·조회·추가·삭제와 그 사이
 * 상태 관리는 여기 안에 있습니다.
 */
export function useTimezones() {
  const [timezones, setTimezones] = useState<Array<ICityProps>>([]);

  const load = useCallback(async () => {
    try {
      await initTimezoneTable();

      setTimezones(await findTimezones());
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addTimezone = useCallback(async (city: string) => {
    const key = await addTimezoneToDb(city);

    setTimezones(prev => [...prev, { key, CITY: city }]);
  }, []);

  const removeTimezone = useCallback(async (id: number) => {
    // 지우고 나서 DB를 건드립니다. 목록에서 먼저 빼야 화면이 바로 반응합니다.
    setTimezones(prev => prev.filter(item => item.key !== id));

    await removeTimezoneFromDb(id);
  }, []);

  return { timezones, addTimezone, removeTimezone };
}
