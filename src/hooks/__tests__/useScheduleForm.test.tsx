import React from 'react';
import renderer, { act } from 'react-test-renderer';

const mockAddSchedule = jest.fn();
const mockEditSchedule = jest.fn();

jest.mock('db', () => ({
  addSchedule: (...args: Array<unknown>) => mockAddSchedule(...args),
  editSchedule: (...args: Array<unknown>) => mockEditSchedule(...args),
}));

const mockMakeNotification = jest.fn();
const mockDeleteAllNotification = jest.fn();

jest.mock('hooks/useNotification', () => ({
  useNotification: () => ({
    makeNotification: mockMakeNotification,
    deleteAllNotification: mockDeleteAllNotification,
  }),
}));

import { useScheduleForm } from '../useScheduleForm';

type ScheduleForm = ReturnType<typeof useScheduleForm>;

const savedSchedule = {
  key: 7,
  TITLE: 'Standup',
  DESCRIPTION: 'daily sync',
  TAG_COLOR: '#F5BE5B',
  TARGET_TIME: '09:00',
  TARGET_CITY: 'Asia/Seoul',
  TARGET_DAY: '2024-01-15',
  DAY_OF_WEEK: '["Mon"]',
};

const renderUseScheduleForm = (
  title = 'Add',
  item: Record<string, unknown> = {},
) => {
  const results: Array<ScheduleForm> = [];

  const Probe = () => {
    results.push(useScheduleForm({ title, item }));

    return null;
  };

  act(() => {
    renderer.create(<Probe />);
  });

  return () => results[results.length - 1];
};

describe('useScheduleForm — 첫 화면', () => {
  it('새 일정은 빈 폼으로 엽니다', () => {
    const form = renderUseScheduleForm();

    expect(form().inputs.title).toBe('');
    expect(form().city).toBe('');
  });

  it('기존 일정은 저장해둔 값으로 채워 엽니다', () => {
    const form = renderUseScheduleForm('Edit', savedSchedule);

    expect(form().inputs.title).toBe('Standup');
    expect(form().city).toBe('Asia/Seoul');
  });
});

describe('useScheduleForm — 태그와 요일 고르기', () => {
  it('태그는 하나만 골리게 합니다', () => {
    const form = renderUseScheduleForm();
    const [first, second] = form().tagList;

    act(() => {
      form().onSelectTag(first.key);
    });

    act(() => {
      form().onSelectTag(second.key);
    });

    const picked = form().tagList.filter(tag => tag.isSelected);

    expect(picked).toHaveLength(1);
    expect(picked[0].key).toBe(second.key);
  });

  it('같은 태그를 다시 누르면 선택을 풉니다', () => {
    const form = renderUseScheduleForm();
    const [first] = form().tagList;

    act(() => {
      form().onSelectTag(first.key);
    });

    act(() => {
      form().onSelectTag(first.key);
    });

    expect(form().tagList.some(tag => tag.isSelected)).toBe(false);
  });

  it('요일은 여러 개 고를 수 있습니다', () => {
    const form = renderUseScheduleForm();
    const [sunday, monday] = form().dayOfWeek;

    act(() => {
      form().onDaySelect(sunday.key);
    });

    act(() => {
      form().onDaySelect(monday.key);
    });

    expect(form().dayOfWeek.filter(day => day.isSelected)).toHaveLength(2);
  });
});

describe('useScheduleForm — 저장', () => {
  beforeEach(() => {
    mockAddSchedule.mockReset();
    mockEditSchedule.mockReset();
    mockMakeNotification.mockReset();
    mockDeleteAllNotification.mockReset();
  });

  it('DB에 넣은 요일과 알림을 잡은 요일이 같습니다', async () => {
    const form = renderUseScheduleForm('Edit', savedSchedule);

    // 2024-01-15 is a Monday, the day the saved schedule repeats on.
    act(() => {
      form().setAlartDate('2024-01-15 09:00');
    });

    await act(async () => {
      await form().onSubmit();
    });

    const savedDays = mockEditSchedule.mock.calls[0][0].dayOfWeek;
    const notifiedDays = mockMakeNotification.mock.calls[0][0].dayOfWeek;

    expect(JSON.parse(savedDays)).toEqual(notifiedDays);
  });

  it('알람이 처음 울리는 날의 요일을 빠뜨리지 않습니다', async () => {
    const form = renderUseScheduleForm('Edit', savedSchedule);

    // 2024-01-17 is a Wednesday, which the saved schedule does not repeat on.
    act(() => {
      form().setAlartDate('2024-01-17 09:00');
    });

    await act(async () => {
      await form().onSubmit();
    });

    const notifiedDays = mockMakeNotification.mock.calls[0][0].dayOfWeek;

    expect(notifiedDays).toEqual(['Mon', 'Wed']);
  });

  it('기존 알림을 지우고 다시 잡습니다', async () => {
    const form = renderUseScheduleForm('Edit', savedSchedule);

    act(() => {
      form().setAlartDate('2024-01-15 09:00');
    });

    await act(async () => {
      await form().onSubmit();
    });

    expect(mockDeleteAllNotification).toHaveBeenCalledWith({ number: 7 });
    expect(mockMakeNotification).toHaveBeenCalled();
  });
});

describe('useScheduleForm — 검증', () => {
  it('제목이 비면 제목을 잘못된 입력으로 표시합니다', () => {
    const form = renderUseScheduleForm('Edit', {
      ...savedSchedule,
      TITLE: '',
    });

    act(() => {
      form().onSubmit();
    });

    expect(form().isTitleInputValid).toBe(false);
  });

  it('도시가 비면 도시를 잘못된 입력으로 표시합니다', () => {
    const form = renderUseScheduleForm('Edit', {
      ...savedSchedule,
      TARGET_CITY: '',
    });

    act(() => {
      form().onSubmit();
    });

    expect(form().isCityInputValid).toBe(false);
  });

  it('빈 폼으로는 저장하지 않습니다', () => {
    const form = renderUseScheduleForm();

    act(() => {
      form().onSubmit();
    });

    expect(mockAddSchedule).not.toHaveBeenCalled();
  });
});
