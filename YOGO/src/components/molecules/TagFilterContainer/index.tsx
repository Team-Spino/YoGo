import React from 'react';
import { StyleSheet } from 'react-native';
import { TagFilter } from 'components';
import { ITagFilter, ITagFilterProps } from 'types';
import * as S from './style';

export function TagFilterContainer({ tags, onTagPress }: ITagFilterProps) {
  return (
    <S.Container style={styles.containerStyle}>
      {tags!.map((tag: ITagFilter) => {
        return <TagFilter key={tag.key} tag={tag} onTagPress={onTagPress} />;
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
