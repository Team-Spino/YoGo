import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IconTick } from 'assets';
import { ITagListProps } from 'types';

interface ITagSelectProps {
  tag: ITagListProps;
  onSelectTag: (key: string) => void;
}

export function TagSelect({ tag, onSelectTag }: ITagSelectProps) {
  const { key, color, isSelected } = tag;

  return (
    <>
      {!isSelected && (
        <TouchableOpacity
          onPress={() => onSelectTag(key)}
          style={{ width: 23, height: 23, borderRadius: 23, backgroundColor: color }}
        />
      )}
      {isSelected && (
        <TouchableOpacity
          style={{ width: 23, height: 23, borderRadius: 23, backgroundColor: color }}
        >
          <IconTick />
        </TouchableOpacity>
      )}
    </>
  );
}
