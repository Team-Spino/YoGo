import React from 'react';
import { TagSelect, Title } from 'components';
import { ITagListProps } from 'types';
import * as S from './style';

interface ITagSelectContainerProps {
  tagList: Array<ITagListProps>;
  onSelectTag: (key: string) => void;
  isFilter: boolean;
}

export function TagSelectContainer({
  tagList,
  onSelectTag,
  isFilter,
}: ITagSelectContainerProps) {
  return (
    <S.Container>
      <Title isEnable={true} text={'컬러 태그 선택'} size={15} />
      <S.Wrapper>
        {tagList.map(tag => (
          <TagSelect
            key={tag.key}
            tag={tag}
            onSelectTag={onSelectTag}
            isFilter={isFilter}
          />
        ))}
      </S.Wrapper>
    </S.Container>
  );
}
