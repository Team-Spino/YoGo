import React from 'react';
import { View } from '@tamagui/core';
import { TagFilter } from 'components';
import { ITagFilter, ITagFilterProps } from 'types';

/**
 * 태그(색) 필터 줄. 에디토리얼 톤에 맞춰 그림자·박스 없이, 본문과 같은
 * 좌측 20px 기준으로 색 점을 나열합니다.
 */
export function TagFilterContainer({ tags, onTagPress }: ITagFilterProps) {
  return (
    <View
      flexDirection="row"
      alignItems="center"
      gap={16}
      paddingHorizontal={20}
      paddingTop={12}
      paddingBottom={18}
    >
      {tags!.map((tag: ITagFilter) => (
        <TagFilter key={tag.key} tag={tag} onTagPress={onTagPress} />
      ))}
    </View>
  );
}
