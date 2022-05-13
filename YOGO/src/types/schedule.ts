export interface IScheduleProps {
  ID: number;
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
