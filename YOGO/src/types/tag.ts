export interface ITagListProps {
  key: string;
  color: string;
  isSelected: boolean;
}

export interface ITagFilter {
  key: string;
  color: string;
  isSelected: boolean;
}

export interface ITagFilterProps {
  tags?: Array<ITagFilter>;
  tag?: ITagFilter;
  onTagPress: (key: string) => void;
}
