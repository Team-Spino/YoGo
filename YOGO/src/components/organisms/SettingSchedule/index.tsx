import React, { useState, useContext } from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  TextInput,
  SearchTarget,
  TagSelectContainer,
  DayOfWeekContainer,
  SetCityAndDate,
  Button,
} from 'components';
import { DAY_OF_WEEK, TZ_DATA_BASES, TAG_COLOR } from 'utils';
import {
  ITagListProps,
  IDayOfWeekProps,
  IHandelScheduleProps,
  IItemProps,
  keyType,
} from 'types';
import { useNotification } from 'hooks';
import { connectDB, insertScheduleItem, updateAllSchedule } from 'db';
import { PopContext } from 'context';
import * as S from './style';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);

interface IGetInitialProps {
  title: string;
  key: keyType;
  item: IItemProps;
}

const getInitialProps = ({ title, key, item }: IGetInitialProps) => {
  // Title, Description Edit or Add
  if (
    title === 'Edit' &&
    (key === 'TITLE' || key === 'DESCRIPTION' || key === 'TARGET_CITY')
  )
    return item[key];
  else if (title === 'Add' && key === 'TARGET_CITY' && item[key])
    return item[key];
  else if (
    title === 'Add' &&
    (key === 'TITLE' || key === 'DESCRIPTION' || key === 'TARGET_CITY')
  )
    return '';

  // TagColor Edit
  if (title === 'Edit' && key === 'TAG_COLOR' && item[key] === '#B5B5B9')
    return TAG_COLOR;
  else if (title === 'Edit' && key === 'TAG_COLOR' && item[key] !== '#B5B5B9')
    return TAG_COLOR.map(tag => {
      return tag.color === item[key] ? { ...tag, isSelected: true } : tag;
    });
  else if (title === 'Add' && key === 'TAG_COLOR') return TAG_COLOR;

  // Target Time
  if (title === 'Edit' && key === 'TARGET_TIME') {
    const date = dayjs().format('YYYY-MM-DD');
    return new Date(`${date} ${item[key]}`);
  } else if (title === 'Add' && key === 'TARGET_TIME') return new Date();
  else if (title === 'Add' && key === 'TARGET_DAY')
    return new Date(item[key] as Date);

  // Day of week
  if (title === 'Edit' && key === 'DAY_OF_WEEK') {
    const selDayOfWeek = JSON.parse(item[key] as string);

    return DAY_OF_WEEK.map(day =>
      selDayOfWeek.includes(day.name) ? { ...day, isSelected: true } : day,
    );
  } else if (title === 'Add' && key == 'DAY_OF_WEEK') return DAY_OF_WEEK;
};

export function SettingSchedule({ navigation, route }: IHandelScheduleProps) {
  const { title, item } = route.params;

  const initialState = {
    title: getInitialProps({ title, key: 'TITLE', item }) as string,
    description: getInitialProps({ title, key: 'DESCRIPTION', item }) as string,
    tagColor: getInitialProps({
      title,
      key: 'TAG_COLOR',
      item,
    }) as Array<ITagListProps>,
    city: getInitialProps({ title, key: 'TARGET_CITY', item }) as string,
    date: item?.isFromBottomSheet
      ? (getInitialProps({ title, key: 'TARGET_DAY', item }) as Date)
      : (getInitialProps({ title, key: 'TARGET_TIME', item }) as Date),
    dayOfWeek: getInitialProps({
      title,
      key: 'DAY_OF_WEEK',
      item,
    }) as Array<IDayOfWeekProps>,
  };

  const [inputs, setInputs] = useState({
    title: initialState.title,
    description: initialState.description,
  });

  const [tagList, setTagList] = useState<Array<ITagListProps>>(
    initialState.tagColor,
  );

  const [isCitySelected, setIsCitySelected] = useState<boolean>(false);

  const [city, setCity] = useState<string>(initialState.city as string);

  const [date, setDate] = useState<Date>(initialState.date);

  const [alartDate, setAlartDate] = useState<string | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<Array<IDayOfWeekProps>>(
    initialState.dayOfWeek,
  );

  const [isTitleInputValid, setIsTitleInputValid] = useState(true);

  const [isCityInputValid, setIsCityInputValid] = useState(true);

  const { setPop } = useContext(PopContext);

  const { makeNotification, deleteAllNotification } = useNotification();

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

  const targetList = TZ_DATA_BASES.filter(item =>
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

  const checkValidate = () => {
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

  const insertSchedule = async ({ formState }: { formState: any }) => {
    try {
      const db = await connectDB();
      return (await insertScheduleItem(db, formState)) as number;
    } catch (e) {
      console.error(e.message);
    }
  };

  const editSchedule = async ({ formState }: { formState: any }) => {
    try {
      const db = await connectDB();
      await updateAllSchedule(db, { ...formState, key: item.key, isActive: 1 });
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = async () => {
    if (checkValidate()) {
      let formState = {
        title: inputs.title,
        description: inputs.description,
        tagColor: tagList.filter(tag => tag.isSelected)[0]?.color ?? '#B5B5B9',
        targetTime: dayjs(date).format('HH:mm'),
        targetDay: dayjs(date).format('YYYY-MM-DD'),
        targetCity: city,
        curTime: dayjs(alartDate ?? date).format('HH:mm'),
        curDay: dayjs(alartDate ?? date).format('YYYY-MM-DD'),
        curCity: dayjs.tz.guess(),
        dayOfWeek: JSON.stringify(
          dayOfWeek.filter(day => day.isSelected).map(day => day.name),
        ),
      };

      if (formState.dayOfWeek === '[]') {
        const result = await asyncAlert();
        const now = dayjs().format('YYYY-MM-DD HH:mm');
        const alartTime = `${formState.curDay} ${formState.curTime}`;
        const isSameOrBefore = dayjs(alartTime).isSameOrBefore(now);

        if (!result && isSameOrBefore) {
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

      if (formState.dayOfWeek !== '[]') {
        const selDayOfWeek = date.toLocaleDateString('en', {
          weekday: 'short',
        });

        const dayOfWeekList = JSON.parse(formState.dayOfWeek);

        if (!dayOfWeekList.includes(selDayOfWeek)) {
          formState.dayOfWeek = JSON.stringify([
            ...dayOfWeekList,
            selDayOfWeek,
          ]);
        }
      }

      if (title === 'Add') {
        const key = await insertSchedule({ formState });

        if (key) {
          makeNotification({
            key,
            title: inputs.title,
            description: inputs.description,
            date: alartDate as string,
            dayOfWeek: dayOfWeek
              .filter(day => day.isSelected)
              .map(day => day.name),
          });
        }
      }

      if (title === 'Edit') {
        editSchedule({ formState });

        await deleteAllNotification({ number: item.key as number });
        await makeNotification({
          key: item.key as number,
          title: inputs.title,
          description: inputs.description,
          date: alartDate as string,
          dayOfWeek: dayOfWeek
            .filter(day => day.isSelected)
            .map(day => day.name),
        });
      }
      setPop(true);
      navigation.pop();
    }
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
