import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TagFilter } from 'components';
import { ITagFilterProps } from 'types';
import * as S from './style';

export function TagFilterContainer({ tags }: { tags: Array<ITagFilterProps> }) {
  return (
    <S.Container style={styles.containerStyle}>
      {tags.map((tag: ITagFilterProps) => {
        return <TagFilter key={tag.key} tags={tag} />;
      })}
    </S.Container>
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
