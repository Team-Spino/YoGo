import React, { useState, useContext } from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from 'react-native';
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
import { PopContext } from 'context';
import * as S from './style';

dayjs.extend(utc);
dayjs.extend(timezone);

type Prop = NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;

export function SettingSchedule({ navigation }: { navigation: Prop }) {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const [tagList, setTagList] = useState<Array<ITagListProps>>(TAG_COLOR);

  const [isCitySelected, setIsCitySelected] = useState<boolean>(false);

  const [city, setCity] = useState<string>('');

  const [date, setDate] = useState(new Date());

  const [alartDate, setAlartDate] = useState<string | null>(null);
  const [dayOfWeek, setDayOfWeek] =
    useState<Array<IDayOfWeekProps>>(DAY_OF_WEEK);

  const [isTitleInputValid, setIsTitleInputValid] = useState(true);

  const [isCityInputValid, setIsCityInputValid] = useState(true);

  const { setPop } = useContext(PopContext);

  const { makeNotification } = useNotification();

  const handleChange =
    (name: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const { text } = e.nativeEvent;
      setInputs({ ...inputs, [name]: text });

      if (name === 'title' && text) setIsTitleInputValid(true);
      else if (name === 'title' && !text) setIsTitleInputValid(false);
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
    setIsCityInputValid(true);
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

  const asyncAlert = async () =>
    new Promise(resolve => {
      Alert.alert('Yogo', '이 일정을 반복하겠습니까?', [
        {
          text: 'Cancel',
          onPress: () => {
            resolve(false);
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            resolve(true);
          },
        },
      ]);
    });

  const checkValidate = async () => {
    if (!city || !inputs.title) {
      let message = '';
      if (!city && !inputs.title) message = 'Please Input Title and City';
      else if (!city) message = 'Please Input City';
      else if (!inputs.title) message = 'Please Input Title';

      if (!city) setIsCityInputValid(false);
      if (!inputs.title) setIsTitleInputValid(false);

      Alert.alert('Yogo', message);

      return false;
    }
    return true;
  };

  const insertSchedule = async () => {
    try {
      console.log('hello');
      const db = await connectDB();
      // await insertScheduleItem(db, {
      //   title: inputs.title,
      //   description: inputs.description,
      //   tagColor: tagList.filter(tag => tag.isSelected)[0]?.color ?? '#B5B5B9',
      //   targetTime: dayjs(date).format('HH:mm'),
      //   targetDay: dayjs(date).format('YYYY-MM-DD'),
      //   targetCity: city.split('/').at(-1),
      //   curTime: dayjs(alartDate ?? date).format('HH:mm'),
      //   curDay: dayjs(alartDate ?? date).format('YYYY-MM-DD'),
      //   curCity: dayjs.tz.guess().split('/').at(-1),
      //   dayOfWeek: JSON.stringify(
      //     dayOfWeek.filter(day => day.isSelected).map(day => day.name),
      //   ),
      // });
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async () => {
    if (await checkValidate()) {
      let formState = {
        title: inputs.title,
        description: inputs.description,
        tagColor: tagList.filter(tag => tag.isSelected)[0]?.color ?? '#B5B5B9',
        targetTime: dayjs(date).format('HH:mm'),
        targetDay: dayjs(date).format('YYYY-MM-DD'),
        targetCity: city.split('/').at(-1),
        curTime: dayjs(alartDate ?? date).format('HH:mm'),
        curDay: dayjs(alartDate ?? date).format('YYYY-MM-DD'),
        curCity: dayjs.tz.guess().split('/').at(-1),
        dayOfWeek: JSON.stringify(
          dayOfWeek.filter(day => day.isSelected).map(day => day.name),
        ),
      };

      if (formState.dayOfWeek === '[]') {
        const result = await asyncAlert();
        const now = dayjs().format('YYYY-MM-DD HH:mm');
        const alartTime = `${formState.curDay} ${formState.curTime}`;
        const isBefore = dayjs(alartTime).isBefore(now);

        if (!result && isBefore) {
          Alert.alert(
            'Yogo',
            '이미 지난 일정입니다. 시간을 다시 입력해주세요.',
          );

          return;
        }

        if (result) {
          const curDateOfWeek = new Date(alartTime).toLocaleDateString(
            'en-US',
            {
              weekday: 'short',
            },
          );

          const { name } = dayOfWeek.filter(
            day => day.name === curDateOfWeek,
          )[0];

          formState = { ...formState, dayOfWeek: JSON.stringify([name]) };
        }
      }
    }

    insertSchedule();
    makeNotification({
      title: inputs.title,
      description: inputs.description,
      date: alartDate as string,
      dayOfWeek: dayOfWeek.filter(day => day.isSelected).map(day => day.name),
    });
    setPop(true);
    navigation.pop();
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
                isBottomSheet={false}
                onChangeDate={onChangeDate}
                isCityInputValid={isCityInputValid}
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
