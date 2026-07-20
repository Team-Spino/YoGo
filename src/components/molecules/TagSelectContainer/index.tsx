import React from 'react';
import { View } from '@tamagui/core';
import { TagSelect, Title } from 'components';
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
    <View
      width="100%"
      paddingVertical={15}
      paddingHorizontal={20}
      borderBottomColor="rgba(0, 0, 0, 0.1)"
      borderBottomWidth={1}
    >
      <Title isEnable={true} text={'Select Color Tag'} size={15} />
      <View
        width="100%"
        flexDirection="row"
        justifyContent="space-evenly"
        marginTop={15}
      >
        {tagList.map(tag => (
          <TagSelect key={tag.key} tag={tag} onSelectTag={onSelectTag} />
        ))}
      </View>
    </View>
  );
}
