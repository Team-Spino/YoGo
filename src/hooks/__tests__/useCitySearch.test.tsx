import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { useCitySearch } from '../useCitySearch';

type CitySearch = ReturnType<typeof useCitySearch>;

const renderUseCitySearch = (initialCity?: string) => {
  const results: Array<CitySearch> = [];

  const Probe = () => {
    results.push(useCitySearch(initialCity));

    return null;
  };

  act(() => {
    renderer.create(<Probe />);
  });

  return {
    latest: () => results[results.length - 1],
    first: () => results[0],
  };
};

describe('useCitySearch', () => {
  it('starts empty when no city is given', () => {
    const { latest } = renderUseCitySearch();

    expect(latest().city).toBe('');
  });

  it('starts from the city it was handed', () => {
    const { latest } = renderUseCitySearch('Asia/Seoul');

    expect(latest().city).toBe('Asia/Seoul');
  });

  it('narrows the zone list down to what was typed', () => {
    const { latest } = renderUseCitySearch();

    act(() => {
      latest().onChangeCity('seoul');
    });

    expect(latest().targetList).toEqual([
      expect.objectContaining({ city: 'Asia/Seoul' }),
    ]);
  });

  it('ignores letter case while narrowing', () => {
    const { latest } = renderUseCitySearch();

    act(() => {
      latest().onChangeCity('SEOUL');
    });

    expect(latest().targetList).toEqual([
      expect.objectContaining({ city: 'Asia/Seoul' }),
    ]);
  });

  it('clears the city so the picker opens on a blank search', () => {
    const { latest } = renderUseCitySearch('Asia/Seoul');

    act(() => {
      latest().openCityPicker();
    });

    expect(latest().isCityPickerOpen).toBe(true);
    expect(latest().city).toBe('');
  });

  it('closes the picker and keeps the city that was picked', () => {
    const { latest } = renderUseCitySearch();

    act(() => {
      latest().openCityPicker();
    });

    act(() => {
      latest().selectCity('Asia/Seoul');
    });

    expect(latest().isCityPickerOpen).toBe(false);
    expect(latest().city).toBe('Asia/Seoul');
  });

  it('treats the input as valid until told otherwise', () => {
    const { latest } = renderUseCitySearch();

    expect(latest().isCityInputValid).toBe(true);
  });

  it('flags the input when the caller reports it empty', () => {
    const { latest } = renderUseCitySearch();

    act(() => {
      latest().markCityInvalid();
    });

    expect(latest().isCityInputValid).toBe(false);
  });

  it('clears the flag once a city is picked', () => {
    const { latest } = renderUseCitySearch();

    act(() => {
      latest().markCityInvalid();
    });

    act(() => {
      latest().selectCity('Asia/Seoul');
    });

    expect(latest().isCityInputValid).toBe(true);
  });
});
