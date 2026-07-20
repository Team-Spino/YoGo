import React from 'react';
import { View } from '@tamagui/core';
import { TagSelect } from 'components';
import { Eyebrow } from 'styles/ui';
import { ITagListProps } from 'types';

interface ITagSelectContainerProps {
  tagList: Array<ITagListProps>;
  onSelectTag: (key: string) => void;
}

export function TagSelectContainer({
  tagList,
  onSelectTag,
}: ITagSelectContainerProps) {
  return (
    <View width="100%" paddingVertical={18}>
      <Eyebrow textTransform="uppercase" letterSpacing={0.6} fontWeight="500">
        Color tag
      </Eyebrow>
      <View
        width="100%"
        flexDirection="row"
        alignItems="center"
        gap={18}
        marginTop={18}
      >
        {tagList.map(tag => (
          <TagSelect key={tag.key} tag={tag} onSelectTag={onSelectTag} />
        ))}
      </View>
    </View>
  );
}
