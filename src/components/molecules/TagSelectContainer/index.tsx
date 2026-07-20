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
      paddingVertical={16}
      paddingHorizontal={16}
      borderRadius={16}
      borderWidth={0.5}
      borderColor="$borderColor"
      backgroundColor="$backgroundStrong"
    >
      <Title isEnable={true} text={'Select Color Tag'} size={15} />
      <View
        width="100%"
        flexDirection="row"
        justifyContent="space-evenly"
        marginTop={16}
      >
        {tagList.map(tag => (
          <TagSelect key={tag.key} tag={tag} onSelectTag={onSelectTag} />
        ))}
      </View>
    </View>
  );
}
