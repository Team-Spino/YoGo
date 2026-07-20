import { ReactElement } from 'react';

export interface IOnBoadingSlide {
  mainImg: ReactElement;
  typography?: ReactElement;
  text?: string;
  btnText: string | Array<string>;
  isEdge: boolean;
  onSkipPress?: () => void;
  onNextPress: (index: number) => void;
}
