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
      <ScrollView
        style={{ width: '100%', flex: 1, backgroundColor: 'transparent' }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View width="100%" flexDirection="column" gap={14}>
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
          <View marginTop={8}>
            <Button text="Save schedule" onPress={onPressSubmit} />
          </View>
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
