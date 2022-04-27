import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { TextInput } from 'components';
import * as S from './style';

export function SettingSchedule() {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const handleChange =
    (name: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const { text } = e.nativeEvent;
      setInputs({ ...inputs, [name]: text });
    };

  return (
    <S.Container>
      <S.Wrapper>
        <TextInput
          placeholder="Title"
          size="30"
          value={inputs.title}
          setValue={handleChange('title')}
        />
        <TextInput
          placeholder="Description"
          size="25"
          value={inputs.description}
          setValue={handleChange('description')}
        />
      </S.Wrapper>
    </S.Container>
  );
}
