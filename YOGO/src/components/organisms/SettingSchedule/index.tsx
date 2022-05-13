import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  TextInput,
  SearchTarget,
  TagSelectContainer,
  DayOfWeekContainer,
  SetCityAndDate,
  Button,
} from 'components';
import { DAY_OF_WEEK, DUMMY_DATA_CITY, TAG_COLOR } from 'utils';
import { ITagListProps, IDayOfWeekProps, RootStackParamList } from 'types';
import { useNotification } from 'hooks';
import { connectDB, insertScheduleItem } from 'db';
import * as S from './style';

dayjs.extend(utc);
dayjs.extend(timezone);

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function SettingSchedule({ navigation }: { navigation: Prop }) {
  const { makeNotification } = useNotification();

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const [tagList, setTagList] = useState<Array<ITagListProps>>(TAG_COLOR);

  const [isCitySelected, setIsCitySelected] = useState<boolean>(false);

  const [city, setCity] = useState<string>('');

  const [date, setDate] = useState(new Date());

  const [alartDate, setAlartDate] = useState('');

  const [dayOfWeek, setDayOfWeek] =
    useState<Array<IDayOfWeekProps>>(DAY_OF_WEEK);

  const handleChange =
    (name: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const { text } = e.nativeEvent;
      setInputs({ ...inputs, [name]: text });
    };

  const onSelectTag = (key: string) => {
    setTagList(
      tagList.map(tag =>
        tag.key === key
          ? { ...tag, isSelected: !tag.isSelected }
          : { ...tag, isSelected: false },
      ),
    );
  };

  const onPressSearchTargetCity = () => {
    setIsCitySelected(true);
    setCity('');
  };

  const onChangeCity = (city: string) => setCity(city);

  const onSubmitCity = (city: string) => {
    setIsCitySelected(false);
    setCity(city);
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onDaySelect = (key: string) => {
    setDayOfWeek(
      dayOfWeek.map(day =>
        day.key === key ? { ...day, isSelected: !day.isSelected } : day,
      ),
    );
  };

  const targetList = DUMMY_DATA_CITY.filter(item =>
    item.city.toUpperCase().includes(city.toUpperCase()),
  );

  const insertSchedule = async () => {
    try {
      const db = await connectDB();

      await insertScheduleItem(db, {
        title: inputs.title,
        description: inputs.description,
        tagColor: tagList.filter(tag => tag.isSelected)[0].color,
        targetTime: dayjs(date).format('HH:mm'),
        targetDay: dayjs(date).format('YYYY-MM-DD'),
        targetCity: city.split('/').at(-1),
        curTime: dayjs(alartDate).format('HH:mm'),
        curDay: dayjs(alartDate).format('YYYY-MM-DD'),
        curCity: dayjs.tz.guess().split('/').at(-1),
        dayOfWeek: JSON.stringify(
          dayOfWeek.filter(day => day.isSelected).map(day => day.name),
        ),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = () => {
    insertSchedule();
    // makeNotification({
    //   title: inputs.title,
    //   description: inputs.description,
    //   date: alartDate,
    //   dayOfWeek: dayOfWeek.filter(day => day.isSelected).map(day => day.name),
    // });

    // navigation.pop();
  };

  return (
    <>
      <S.Container>
        <S.Wrapper>
          {!isCitySelected && (
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
                setAlartDate={setAlartDate}
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
          <Button text="Submit" onPress={onSubmit} />
        </S.Wrapper>
      </S.Container>
      {isCitySelected && (
        <SearchTarget
          targetList={targetList}
          city={city}
          onChangeCity={onChangeCity}
          onSubmitCity={onSubmitCity}
        />
      )}
    </>
  );
}
