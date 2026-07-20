import React from 'react';
import { TextInput } from 'react-native';
import { View, useTheme } from '@tamagui/core';
import { IconSearch } from 'assets';

interface IBSelectTargetInputProps {
  city: string;
  onChangeCity: (city: string) => void;
}

export function SelectTargetInput({
  city,
  onChangeCity,
}: IBSelectTargetInputProps) {
  // RN 컴포넌트(TextInput)와 아이콘 color prop은 Tamagui 토큰 문자열($accent)을
  // 못 받으므로, useTheme으로 실제 값을 읽어 넣습니다.
  const theme = useTheme();

  return (
    <View
      flexDirection="row"
      alignItems="center"
      width="100%"
      marginBottom={16}
      paddingHorizontal={4}
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
    >
      <TextInput
        style={{
          flex: 1,
          fontSize: 18,
          fontWeight: '500',
          paddingVertical: 14,
          color: theme.color.val,
        }}
        placeholder="Search Target City"
        placeholderTextColor={theme.colorMuted.val}
        value={city}
        onChangeText={onChangeCity}
        autoFocus
      />
      <View paddingLeft={8}>
        <IconSearch color={theme.accent.val} />
      </View>
    </View>
  );
}
