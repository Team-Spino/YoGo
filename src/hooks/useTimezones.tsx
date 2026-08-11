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
    // 같은 도시를 두 번 넣으면 목록에 중복 카드가 생깁니다. 이미 있으면 무시합니다.
    const current = await findTimezones();
    if (current.some(item => item.CITY === city)) {
      setTimezones(current);
      return;
    }

    // 새 행의 진짜 key(rowid)가 필요하므로, 넣고 나서 DB에서 다시 읽습니다.
    // 삭제가 key로 동작하기 때문에 낙관적 추정 key를 쓰면 안 됩니다.
    await addTimezoneToDb(city);

    setTimezones(await findTimezones());
  }, []);

  const removeTimezone = useCallback(async (id: number) => {
    // 지우고 나서 DB를 건드립니다. 목록에서 먼저 빼야 화면이 바로 반응합니다.
    setTimezones(prev => prev.filter(item => item.key !== id));

    await removeTimezoneFromDb(id);
  }, []);

  return { timezones, addTimezone, removeTimezone };
}
