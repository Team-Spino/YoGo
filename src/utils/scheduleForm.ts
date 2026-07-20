import dayjs from 'dayjs';
import {
  IDayOfWeekProps,
  IItemProps,
  IScheduleInput,
  ITagListProps,
} from 'types';
import { DAY_OF_WEEK } from 'utils/DAY_OF_WEEK';
import { TAG_COLOR } from 'utils/TAG_COLOR';
import { parseToSlash } from 'utils/parseToSlash';
import { getDeviceZone } from 'utils/timeZone';

const NO_TAG_COLOR = '#B5B5B9';

export interface IScheduleFormState {
  title: string;
  description: string;
  tagColor: Array<ITagListProps>;
  city: string;
  date: Date;
  dayOfWeek: Array<IDayOfWeekProps>;
}

interface IGetInitialScheduleFormProps {
  title: string;
  item: IItemProps;
}

const markSelectedTag = (color?: string) => {
  if (!color || color === NO_TAG_COLOR) return TAG_COLOR;

  return TAG_COLOR.map(tag =>
    tag.color === color ? { ...tag, isSelected: true } : tag,
  );
};

const markSelectedDays = (dayOfWeek?: string) => {
  if (!dayOfWeek) return DAY_OF_WEEK;

  const selected: Array<string> = JSON.parse(dayOfWeek);

  return DAY_OF_WEEK.map(day =>
    selected.includes(day.name) ? { ...day, isSelected: true } : day,
  );
};

const getInitialDate = ({ title, item }: IGetInitialScheduleFormProps) => {
  // new Date(parseToSlash(...))는 Hermes에서 슬래시 포맷을 파싱하지 못해 Invalid
  // Date가 됩니다. 그게 DateTimePicker(display="inline")로 흘러가면 네이티브
  // UICalendarView가 예외를 던져 앱이 죽습니다. dayjs는 문자열을 구성요소로
  // 읽어 안전하므로 dayjs로 파싱합니다. 파싱 실패 시 오늘로 안전하게 대체합니다.
  const safe = (value: string) => {
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed.toDate() : new Date();
  };

  // 검색 시트는 고른 날짜를 통째로 넘겨줍니다.
  if (item?.isFromBottomSheet) {
    return safe(item.TARGET_DAY as string);
  }

  // 저장된 일정은 시각만 들고 있어서, 오늘 날짜에 얹습니다.
  if (title === 'Edit') {
    const today = dayjs().format('YYYY-MM-DD');

    return safe(`${today} ${item.TARGET_TIME}`);
  }

  return new Date();
};

/**
 * 일정 화면이 처음 보여줄 값을 만듭니다.
 *
 * 들어오는 길은 셋입니다: 홈에서 새로 만들기, 홈에서 기존 일정 고치기,
 * 검색 시트에서 도시와 날짜를 들고 넘어오기.
 */
export const getInitialScheduleForm = ({
  title,
  item,
}: IGetInitialScheduleFormProps): IScheduleFormState => {
  const isEdit = title === 'Edit';

  return {
    title: isEdit ? item.TITLE ?? '' : '',
    description: isEdit ? item.DESCRIPTION ?? '' : '',
    tagColor: isEdit ? markSelectedTag(item.TAG_COLOR) : TAG_COLOR,
    city: item.TARGET_CITY ?? '',
    date: getInitialDate({ title, item }),
    dayOfWeek: isEdit ? markSelectedDays(item.DAY_OF_WEEK) : DAY_OF_WEEK,
  };
};

interface IBuildScheduleInputProps {
  title: string;
  description: string;
  tagList: Array<ITagListProps>;
  city: string;
  date: Date;
  alartDate: string | null;
  dayOfWeek: Array<IDayOfWeekProps>;
}

/**
 * 화면에 있는 값을 DB가 받는 모양으로 바꿉니다.
 *
 * target*은 사용자가 고른 대상 도시 기준이고, cur*는 그 시각을 기기
 * 시각으로 되돌린 알람 시각입니다.
 */
export const buildScheduleInput = ({
  title,
  description,
  tagList,
  city,
  date,
  alartDate,
  dayOfWeek,
}: IBuildScheduleInputProps): IScheduleInput => {
  const alarmMoment = dayjs(alartDate ?? date);

  return {
    title,
    description,
    tagColor: tagList.find(tag => tag.isSelected)?.color ?? NO_TAG_COLOR,
    targetTime: dayjs(date).format('HH:mm'),
    targetDay: dayjs(date).format('YYYY-MM-DD'),
    targetCity: city,
    curTime: alarmMoment.format('HH:mm'),
    curDay: alarmMoment.format('YYYY-MM-DD'),
    curCity: getDeviceZone(),
    dayOfWeek: JSON.stringify(
      dayOfWeek.filter(day => day.isSelected).map(day => day.name),
    ),
  };
};

/**
 * 알람이 울리는 날의 요일을 반복 요일 목록에 넣어 줍니다.
 *
 * 목록에 없으면 정작 알람이 처음 울리는 날에 알림이 오지 않습니다.
 */
export const addWeekdayOf = (dayOfWeek: string, date: string) => {
  const weekday = dayjs(parseToSlash(date)).format('ddd');
  const weekdays: Array<string> = JSON.parse(dayOfWeek);

  if (weekdays.includes(weekday)) return dayOfWeek;

  return JSON.stringify([...weekdays, weekday]);
};
