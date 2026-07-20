import React from 'react';
import { TouchableOpacity } from 'react-native';
import { InkButton, InkButtonText } from 'styles/ui';

interface IButtonProps {
  text: string;
  onPress: () => void;
}

export function Button({ text, onPress }: IButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <InkButton>
        <InkButtonText>{text}</InkButtonText>
      </InkButton>
    </TouchableOpacity>
  );
}
