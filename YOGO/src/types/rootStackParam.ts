export type keyType =
  | 'CUR_CITY'
  | 'CUR_DAY'
  | 'CUR_TIME'
  | 'DAY_OF_WEEK'
  | 'DESCRIPTION'
  | 'IS_ACTIVE'
  | 'TAG_COLOR'
  | 'TARGET_CITY'
  | 'TARGET_DAY'
  | 'TARGET_TIME'
  | 'TITLE'
  | 'key';

export interface IItemProps {
  CUR_CITY?: string;
  CUR_DAY?: string;
  CUR_TIME?: string;
  DAY_OF_WEEK?: string;
  DESCRIPTION?: string;
  IS_ACTIVE?: number;
  TAG_COLOR?: string;
  TARGET_CITY?: string;
  TARGET_DAY?: string | Date;
  TARGET_TIME?: string;
  TITLE?: string;
  key?: number;
  isFromBottomSheet?: boolean;
}

export type RootStackParamList = {
  Main: undefined;
  HandleSchedule: {
    title: string;
    item: IItemProps;
  };
  OnBoarding: undefined;
};
