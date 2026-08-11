export interface IScheduleProps {
  isSelected: unknown;
  key: number;
  TITLE: string;
  DESCRIPTION: string;
  TAG_COLOR: string;
  TARGET_TIME: string;
  TARGET_CITY: string;
  TARGET_DAY: string;
  CUR_TIME: string;
  CUR_CITY: string;
  CUR_DAY: string;
  DAY_OF_WEEK: string;
  IS_ACTIVE: number;
}

export interface IScheduleInput {
  title: string;
  description: string;
  tagColor: string;
  targetTime: string;
  targetCity: string;
  targetDay: string;
  curTime: string;
  curCity: string;
  curDay: string;
  dayOfWeek: string;
}

export interface IScheduleUpdate extends IScheduleInput {
  key: number;
  isActive: number;
}

export interface ITargetProps {
  TARGET_TIME: string;
  TARGET_CITY: string;
  TARGET_DAY: string;
}

export interface ICurProps {
  CUR_TIME: string;
  CUR_CITY: string;
  CUR_DAY: string;
}
