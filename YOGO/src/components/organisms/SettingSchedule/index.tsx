import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';

import {
  TextInput,
  SearchTarget,
  TagSelectContainer,
  DayOfWeekContainer,
  SetCityAndDate,
} from 'components';
import { DUMMY_DATA_CITY } from 'utils';
import { ITagListProps, IDayOfWeekProps } from 'types';
import * as S from './style';

export function SettingSchedule() {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const [tagList, setTagList] = useState<Array<ITagListProps>>([
    { key: uuid.v4() as string, color: '#EE7B70', isSelected: false },
    { key: uuid.v4() as string, color: '#F5BE5B', isSelected: false },
    { key: uuid.v4() as string, color: '#FBE864', isSelected: false },
    { key: uuid.v4() as string, color: '#91FC88', isSelected: false },
    { key: uuid.v4() as string, color: '#5FA3F8', isSelected: false },
    { key: uuid.v4() as string, color: '#CB88F8', isSelected: false },
    { key: uuid.v4() as string, color: '#B5B5B9', isSelected: false },
  ]);

  const [dayOfWeek, setDayOfWeek] = useState<Array<IDayOfWeekProps>>([
    { key: uuid.v4() as string, name: 'Sun', isSelected: false },
    { key: uuid.v4() as string, name: 'Mon', isSelected: false },
    { key: uuid.v4() as string, name: 'Tue', isSelected: false },
    { key: uuid.v4() as string, name: 'Wed', isSelected: false },
    { key: uuid.v4() as string, name: 'Thu', isSelected: false },
    { key: uuid.v4() as string, name: 'Fri', isSelected: false },
    { key: uuid.v4() as string, name: 'Sat', isSelected: false },
  ]);

  const onSelectTag = (key: string) => {
    setTagList(
      tagList.map(tag =>
        tag.key === key
          ? { ...tag, isSelected: !tag.isSelected }
          : { ...tag, isSelected: false },
      ),
    );
  };

  const onDaySelect = (key: string) => {
    setDayOfWeek(
      dayOfWeek.map(day =>
        day.key === key ? { ...day, isSelected: !day.isSelected } : day,
      ),
    );
  };

  const [city, setCity] = useState<string>('');
  const [selectedSearchTargetCity, setSelectedSearchTargetCity] =
    useState<boolean>(false);

  const [date, setDate] = useState(new Date());
  const handleChange =
    (name: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const { text } = e.nativeEvent;
      setInputs({ ...inputs, [name]: text });
    };

  const onChangeCity = (city: string) => setCity(city);

  const onPressSearchTargetCity = () => {
    setSelectedSearchTargetCity(true);
    setCity('');
  };

  const onSubmitCity = (city: string) => {
    setSelectedSearchTargetCity(false);
    setCity(city);
  };

  const targetList = DUMMY_DATA_CITY.filter(item =>
    item.city.toUpperCase().includes(city.toUpperCase()),
  );

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <S.Container>
      <S.Wrapper>
        {!selectedSearchTargetCity && (
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
            <TagSelectContainer tagList={tagList} onSelectTag={onSelectTag} />
            <SetCityAndDate
              city={city}
              date={date}
              isBottomSheet={false}
              onChangeDate={onChangeDate}
              onPressSearchTargetCity={onPressSearchTargetCity}
            />
            <DayOfWeekContainer
              dayOfWeek={dayOfWeek}
              onDaySelect={onDaySelect}
            />
          </>
        )}
        {selectedSearchTargetCity && (
          <SearchTarget
            targetList={targetList}
            city={city}
            onChangeCity={onChangeCity}
            onSubmitCity={onSubmitCity}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
}
