export interface ITarget {
  time: string;
  local: string;
  day: string;
}

export interface ICur {
  time: string;
  local: string;
  day: string;
}

export interface ITimeData {
  id: number;
  title: string;
  description: string;
  tagColor: string;
  target: ITarget;
  cur: ICur;
  dayOfWeek: string[];
}
