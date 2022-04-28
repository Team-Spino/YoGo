import React from 'react';
import { TagSelect,Title } from 'components';
import { TAG_COLOR } from 'utils';
import { ITagListProps } from 'types';
import * as S from './style';

interface ITagSelectContainerProps {
    tagList: Array<ITagListProps>;
    onSelectTag: (key: string) => void;
}

export function TagSelectContainer({tagList, onSelectTag}: ITagSelectContainerProps) {
    return (
      <S.Container>
        <Title isEnable={true} text={'컬러 태그 선택'} size={15} />
        <S.Wrapper>
          {tagList.map((tag) => (
            <TagSelect key={tag.key} tag={tag} onSelectTag={onSelectTag}/>
          ))}
        </S.Wrapper>
      </S.Container>
    );
}
