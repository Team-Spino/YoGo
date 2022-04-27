import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  TextInput,
  SearchTarget,
  SelectTargetCityBtn,
  SelectTargetDate,
} from 'components';
import { DUMMY_DATA_CITY } from 'utils';
import * as S from './style';

export function SettingSchedule() {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });
  
  const [location, setLocation] = useState<string>('');
  const [selectedSearchTargetCity, setSelectedSearchTargetCity] = useState<boolean>(false);

    const [date, setDate] = useState(new Date());
  const handleChange =
    (name: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const { text } = e.nativeEvent;
      setInputs({ ...inputs, [name]: text });
    };
  
  const onChangeLocation = (location: string) => setLocation(location);
  const onPressSearchTargetCity = () => { 
    setSelectedSearchTargetCity(true);
    setLocation('');
  }
  const onSubmitText = (location: string) => { 
    setSelectedSearchTargetCity(false);
    setLocation(location);
  }

  const targetList = DUMMY_DATA_CITY.filter(item =>
    item.city.toUpperCase().includes(location.toUpperCase()),
  );

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };  

  return (
    <S.Container>
      <S.Wrapper>
        {!selectedSearchTargetCity ? (
          <>
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
            <SelectTargetCityBtn
              onPress={() => onPressSearchTargetCity()}
              text={location.trim() === '' ? '국가, 도시' : location}
            />
            <SelectTargetDate onChangeDate={onChangeDate} date={date} />
          </>
        ) : (
          <SearchTarget
            targetList={targetList}
            text={location}
            onChangeText={onChangeLocation}
            onSubmitText={onSubmitText}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
}
