import React from 'react';
import * as S from './style';
import { IconSearch } from 'assets';
import { TextInput } from 'react-native-paper';
import { Text } from 'react-native';
interface BHearderProps {
  list: string[] ;
  size: number;
}

export function SelectTargetInput(){
  const [text, onChangeText] = React.useState("");
  return (
    // <S.TextInput
    //   placeholder='Search Target City'
    //   onChangeText={onChangeText}
    //   value={text}
    // ></S.TextInput>
    <S.InputText
    mode="outlined"
    label="Search Target City"
    placeholder="Search Target City"
    outlineColor='#6564CC'
    activeOutlineColor='#6564CC'
    right={<TextInput.Icon name={() => <IconSearch color={"#6564CC"}/>} />}
    ></S.InputText>
  );
}
