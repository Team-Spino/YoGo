import React, { useContext } from 'react';
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
import { PopContext } from 'context';
import * as S from './style';

export function SettingSchedule({ navigation, route }: IHandelScheduleProps) {
  const { title, item } = route.params;

  const { setPop } = useContext(PopContext);

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

    setPop(true);
    navigation.pop();
  };

  return (
    <>
      <S.Container>
        <S.Wrapper>
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
        </S.Wrapper>
      </S.Container>
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
