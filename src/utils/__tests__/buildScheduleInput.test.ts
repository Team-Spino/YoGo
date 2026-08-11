import { addWeekdayOf, buildScheduleInput } from '../scheduleForm';

const tagList = [
  { key: 'a', color: '#EE7B70', isSelected: false },
  { key: 'b', color: '#F5BE5B', isSelected: false },
];

const dayOfWeek = [
  { key: '1', name: 'Sun', isSelected: false },
  { key: '2', name: 'Mon', isSelected: false },
  { key: '3', name: 'Wed', isSelected: false },
];

// 2024-01-15 09:00 is a Monday.
const date = new Date('2024-01-15T09:00:00');

const base = {
  title: 'Standup',
  description: 'daily sync',
  tagList,
  city: 'Asia/Seoul',
  date,
  alartDate: null,
  dayOfWeek,
};

describe('buildScheduleInput', () => {
  it('carries the typed title and description over', () => {
    const input = buildScheduleInput(base);

    expect(input.title).toBe('Standup');
    expect(input.description).toBe('daily sync');
  });

  it('takes the colour of the tag that is picked', () => {
    const input = buildScheduleInput({
      ...base,
      tagList: [tagList[0], { ...tagList[1], isSelected: true }],
    });

    expect(input.tagColor).toBe('#F5BE5B');
  });

  it('falls back to grey when no tag is picked', () => {
    const input = buildScheduleInput(base);

    expect(input.tagColor).toBe('#B5B5B9');
  });

  it('splits the picked moment into a target day and time', () => {
    const input = buildScheduleInput(base);

    expect(input.targetDay).toBe('2024-01-15');
    expect(input.targetTime).toBe('09:00');
    expect(input.targetCity).toBe('Asia/Seoul');
  });

  it('uses the alarm moment for the local day and time when there is one', () => {
    const input = buildScheduleInput({
      ...base,
      alartDate: '2024-01-14 22:30',
    });

    expect(input.curDay).toBe('2024-01-14');
    expect(input.curTime).toBe('22:30');
  });

  it('falls back to the picked moment when no alarm time was worked out', () => {
    const input = buildScheduleInput(base);

    expect(input.curDay).toBe('2024-01-15');
    expect(input.curTime).toBe('09:00');
  });

  it('writes down the days that were picked', () => {
    const input = buildScheduleInput({
      ...base,
      dayOfWeek: [
        dayOfWeek[0],
        { ...dayOfWeek[1], isSelected: true },
        { ...dayOfWeek[2], isSelected: true },
      ],
    });

    expect(input.dayOfWeek).toBe('["Mon","Wed"]');
  });

  it('leaves the day list empty for a one-off schedule', () => {
    const input = buildScheduleInput(base);

    expect(input.dayOfWeek).toBe('[]');
  });
});

describe('addWeekdayOf', () => {
  it('adds the alarm day when it is not among the picked days', () => {
    // 2024-01-17 is a Wednesday.
    expect(addWeekdayOf('["Mon"]', '2024-01-17 09:00')).toBe('["Mon","Wed"]');
  });

  it('leaves the list alone when the alarm day is already there', () => {
    // 2024-01-15 is a Monday.
    expect(addWeekdayOf('["Mon"]', '2024-01-15 09:00')).toBe('["Mon"]');
  });

  it('starts the list off when nothing was picked', () => {
    expect(addWeekdayOf('[]', '2024-01-15 09:00')).toBe('["Mon"]');
  });
});
