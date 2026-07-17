import { useCallback, useMemo, useState } from 'react';
import { TZ_DATA_BASES } from 'utils';

/**
 * 타임존 목록에서 도시를 찾아 고르는 흐름입니다.
 *
 * 일정 만들기 화면과 검색 시트가 같은 동작을 각자 들고 있던 것을 모았습니다.
 */
export function useCitySearch(initialCity = '') {
  const [city, setCity] = useState(initialCity);
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);
  const [isCityInputValid, setIsCityInputValid] = useState(true);

  const targetList = useMemo(
    () =>
      TZ_DATA_BASES.filter(item =>
        item.city.toUpperCase().includes(city.toUpperCase()),
      ),
    [city],
  );

  const onChangeCity = useCallback((next: string) => setCity(next), []);

  const openCityPicker = useCallback(() => {
    setIsCityPickerOpen(true);
    setCity('');
  }, []);

  const selectCity = useCallback((next: string) => {
    setIsCityPickerOpen(false);
    setIsCityInputValid(true);
    setCity(next);
  }, []);

  const markCityInvalid = useCallback(() => setIsCityInputValid(false), []);

  return {
    city,
    setCity,
    targetList,
    isCityPickerOpen,
    isCityInputValid,
    onChangeCity,
    openCityPicker,
    selectCity,
    markCityInvalid,
  };
}
