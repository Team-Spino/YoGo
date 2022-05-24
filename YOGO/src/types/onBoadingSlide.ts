export interface IOnBoadingSlide {
  mainImg: JSX.Element;
  typography?: JSX.Element;
  text?: string;
  btnText: string | Array<string>;
  isEdge: boolean;
  onSkipPress?: () => void;
  onNextPress?: (index: number) => void | (() => void);
}
