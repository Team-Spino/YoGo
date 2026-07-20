import React from 'react';
import { ScrollView } from 'react-native';
import { View } from '@tamagui/core';
import {
  TextInput,
  SearchTarget,
  TagSelectContainer,
  DayOfWeekContainer,
  SetCityAndDate,
  Button,
} from 'components';
import { IHandelScheduleProps } from 'types';
import { useScheduleForm } from 'hooks';

export function SettingSchedule({ navigation, route }: IHandelScheduleProps) {
  const { title, item } = route.params;

  const {
    inputs,
    tagList,
    date,
    dayOfWeek,
    city,
    targetList,
    isCityPickerOpen,
    isCityInputValid,
    isTitleInputValid,
    setAlartDate,
    handleChange,
    onSelectTag,
    onDaySelect,
    onChangeDate,
    onChangeCity,
    openCityPicker,
    selectCity,
    onSubmit,
  } = useScheduleForm({ title, item });

  const onPressSubmit = async () => {
    const isSaved = await onSubmit();

    if (!isSaved) return;

    navigation.pop();
  };

  return (
    <>
      <ScrollView style={{ width: '100%', flex: 1 }}>
        <View
          width="100%"
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {!isCityPickerOpen && (
            <>
              <TextInput
                placeholder="Title"
                size="30"
                value={inputs.title}
                isTitleInputValid={isTitleInputValid}
                setValue={handleChange('title')}
              />
              <TextInput
                placeholder="Description"
                size="25"
                value={inputs.description}
                isTitleInputValid={true}
                setValue={handleChange('description')}
              />
              <TagSelectContainer tagList={tagList} onSelectTag={onSelectTag} />
              <SetCityAndDate
                city={city}
                date={date}
                setAlartDate={setAlartDate}
                onChangeDate={onChangeDate}
                isCityInputValid={isCityInputValid}
                onPressSearchTargetCity={openCityPicker}
              />
              <DayOfWeekContainer
                dayOfWeek={dayOfWeek}
                onDaySelect={onDaySelect}
              />
            </>
          )}
          <Button text="Submit" onPress={onPressSubmit} />
        </View>
      </ScrollView>
      {isCityPickerOpen && (
        <SearchTarget
          targetList={targetList}
          city={city}
          onChangeCity={onChangeCity}
          onSubmitCity={selectCity}
        />
      )}
    </>
  );
}
