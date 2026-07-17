import dayjs from 'dayjs';
import { TAG_COLOR } from '../TAG_COLOR';
import { getInitialScheduleForm } from '../scheduleForm';

const savedSchedule = {
  key: 7,
  TITLE: 'Standup',
  DESCRIPTION: 'daily sync',
  TAG_COLOR: '#F5BE5B',
  TARGET_TIME: '09:00',
  TARGET_CITY: 'Asia/Seoul',
  TARGET_DAY: '2024-01-15',
  DAY_OF_WEEK: '["Mon","Wed"]',
};

describe('getInitialScheduleForm — 새 일정', () => {
  it('빈 폼으로 시작합니다', () => {
    const form = getInitialScheduleForm({ title: 'Add', item: {} });

    expect(form.title).toBe('');
    expect(form.description).toBe('');
    expect(form.city).toBe('');
  });

  it('아무 태그도 고르지 않은 상태로 시작합니다', () => {
    const form = getInitialScheduleForm({ title: 'Add', item: {} });

    expect(form.tagColor.some(tag => tag.isSelected)).toBe(false);
  });

  it('아무 요일도 고르지 않은 상태로 시작합니다', () => {
    const form = getInitialScheduleForm({ title: 'Add', item: {} });

    expect(form.dayOfWeek.some(day => day.isSelected)).toBe(false);
  });

  it('지금 시각으로 시작합니다', () => {
    const form = getInitialScheduleForm({ title: 'Add', item: {} });

    expect(form.date).toBeInstanceOf(Date);
    expect(dayjs(form.date).format('YYYY-MM-DD')).toBe(
      dayjs().format('YYYY-MM-DD'),
    );
  });
});

describe('getInitialScheduleForm — 저장된 일정 수정', () => {
  it('저장해둔 제목과 설명, 도시를 그대로 채웁니다', () => {
    const form = getInitialScheduleForm({
      title: 'Edit',
      item: savedSchedule,
    });

    expect(form.title).toBe('Standup');
    expect(form.description).toBe('daily sync');
    expect(form.city).toBe('Asia/Seoul');
  });

  it('저장해둔 색을 고른 상태로 표시합니다', () => {
    const form = getInitialScheduleForm({
      title: 'Edit',
      item: savedSchedule,
    });

    const selected = form.tagColor.filter(tag => tag.isSelected);

    expect(selected).toHaveLength(1);
    expect(selected[0].color).toBe('#F5BE5B');
  });

  it('기본 회색이면 고른 색이 없는 것으로 봅니다', () => {
    const form = getInitialScheduleForm({
      title: 'Edit',
      item: { ...savedSchedule, TAG_COLOR: '#B5B5B9' },
    });

    expect(form.tagColor.some(tag => tag.isSelected)).toBe(false);
  });

  it('저장해둔 요일을 고른 상태로 표시합니다', () => {
    const form = getInitialScheduleForm({
      title: 'Edit',
      item: savedSchedule,
    });

    const selected = form.dayOfWeek
      .filter(day => day.isSelected)
      .map(day => day.name);

    expect(selected).toEqual(['Mon', 'Wed']);
  });

  it('저장해둔 시각을 오늘 날짜에 얹어 보여줍니다', () => {
    const form = getInitialScheduleForm({
      title: 'Edit',
      item: savedSchedule,
    });

    expect(dayjs(form.date).format('HH:mm')).toBe('09:00');
    expect(dayjs(form.date).format('YYYY-MM-DD')).toBe(
      dayjs().format('YYYY-MM-DD'),
    );
  });
});

describe('getInitialScheduleForm — 검색 시트에서 넘어온 일정', () => {
  const fromBottomSheet = {
    TARGET_CITY: 'Asia/Seoul',
    TARGET_DAY: '2024-01-15 09:00:00',
    isFromBottomSheet: true,
  };

  it('시트에서 고른 도시를 가져옵니다', () => {
    const form = getInitialScheduleForm({
      title: 'Add',
      item: fromBottomSheet,
    });

    expect(form.city).toBe('Asia/Seoul');
  });

  it('지금이 아니라 시트에서 고른 날짜로 시작합니다', () => {
    const form = getInitialScheduleForm({
      title: 'Add',
      item: fromBottomSheet,
    });

    expect(dayjs(form.date).format('YYYY-MM-DD HH:mm')).toBe(
      '2024-01-15 09:00',
    );
  });

  it('제목은 비어 있습니다', () => {
    const form = getInitialScheduleForm({
      title: 'Add',
      item: fromBottomSheet,
    });

    expect(form.title).toBe('');
  });
});

describe('getInitialScheduleForm — 공유 상수 보호', () => {
  it('고른 태그를 표시해도 원본 상수는 건드리지 않습니다', () => {
    getInitialScheduleForm({ title: 'Edit', item: savedSchedule });

    expect(TAG_COLOR.some(tag => tag.isSelected)).toBe(false);
  });
});
