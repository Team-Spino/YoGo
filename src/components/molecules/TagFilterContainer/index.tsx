import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@tamagui/core';
import { TagFilter } from 'components';
import { ITagFilter, ITagFilterProps } from 'types';

export function TagFilterContainer({ tags, onTagPress }: ITagFilterProps) {
  return (
    <View
      width="95%"
      height={30}
      backgroundColor="$background"
      marginVertical={20}
      marginHorizontal={10}
      justifyContent="space-evenly"
      alignItems="center"
      flexDirection="row"
      borderRadius={8}
      padding={5}
      style={styles.containerStyle}
    >
      {tags!.map((tag: ITagFilter) => {
        return <TagFilter key={tag.key} tag={tag} onTagPress={onTagPress} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
