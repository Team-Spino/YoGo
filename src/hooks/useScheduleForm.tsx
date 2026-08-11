import { useState } from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  TextInputChangeEventData,
} from 'react-native';
import { useDialog } from 'context/dialog';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { addSchedule, editSchedule } from 'db';
import { useCitySearch } from 'hooks/useCitySearch';
import { useNotification } from 'hooks/useNotification';
import { scheduleStore } from 'stores';
import {
  IDayOfWeekProps,
  IItemProps,
  IScheduleInput,
  ITagListProps,
} from 'types';
import {
  addWeekdayOf,
  buildScheduleInput,
  getInitialScheduleForm,
} from 'utils';

dayjs.extend(isSameOrBefore);

const NO_DAY_PICKED = '[]';

interface IUseScheduleFormProps {
  title: string;
  item: IItemProps;
}

/**
 * 일정을 만들고 고치는 화면의 상태와 저장 흐름입니다.
 */
export function useScheduleForm({ title, item }: IUseScheduleFormProps) {
  const { alert, open } = useDialog();
  const initialState = getInitialScheduleForm({ title, item });

  const [inputs, setInputs] = useState({
    title: initialState.title,
    description: initialState.description,
  });
  const [tagList, setTagList] = useState<Array<ITagListProps>>(
    initialState.tagColor,
  );
  const [date, setDate] = useState<Date>(initialState.date);
  const [alartDate, setAlartDate] = useState<string | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<Array<IDayOfWeekProps>>(
    initialState.dayOfWeek,
  );
  const [isTitleInputValid, setIsTitleInputValid] = useState(true);

  const citySearch = useCitySearch(initialState.city);
  const { city, markCityInvalid } = citySearch;

  const { makeNotification, deleteAllNotification } = useNotification();

  const handleChange =
    (name: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const { text } = e.nativeEvent;
      setInputs({ ...inputs, [name]: text });

      if (name === 'title') setIsTitleInputValid(Boolean(text));
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

  const onDaySelect = (key: string) => {
    setDayOfWeek(
      dayOfWeek.map(day =>
        day.key === key ? { ...day, isSelected: !day.isSelected } : day,
      ),
    );
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) return;

    setDate(selectedDate);
  };

  const checkValidate = () => {
    if (city && inputs.title) return true;

    let message = '';
    if (!city && !inputs.title) message = 'Please Input Title and City';
    else if (!city) message = 'Please Input City';
    else message = 'Please Input Title';

    if (!city) markCityInvalid();
    if (!inputs.title) setIsTitleInputValid(false);

    alert(message);

    return false;
  };

  /** 반복할지 하루만인지 사용자에게 묻습니다. */
  const askIsWeekly = async (): Promise<boolean> => {
    const index = await open({
      title: 'Schedule type',
      message: 'How often should this schedule repeat?',
      buttons: [
        { text: 'Just once', variant: 'cancel' },
        { text: 'Every week', variant: 'primary' },
      ],
    });
    return index === 1;
  };

  /**
   * 요일을 하나도 고르지 않았을 때, 하루만인지 매주인지 정합니다.
   *
   * 하루만인데 이미 지난 시각이면 저장하지 않습니다.
   */
  const resolveDaysForOneOff = async (scheduleInput: IScheduleInput) => {
    const alarmTime = `${scheduleInput.curDay} ${scheduleInput.curTime}`;
    const isWeekly = await askIsWeekly();

    if (isWeekly) return addWeekdayOf(scheduleInput.dayOfWeek, alarmTime);

    const hasPassed = dayjs(alarmTime).isSameOrBefore(
      dayjs().format('YYYY-MM-DD HH:mm'),
    );

    if (hasPassed) {
      alert('This time has already passed. Please pick a future time.');

      return null;
    }

    return scheduleInput.dayOfWeek;
  };

  const resolveDays = async (scheduleInput: IScheduleInput) => {
    if (scheduleInput.dayOfWeek === NO_DAY_PICKED) {
      return resolveDaysForOneOff(scheduleInput);
    }

    // 알람이 처음 울리는 날의 요일이 빠져 있으면 그날 알림이 오지 않습니다.
    return addWeekdayOf(scheduleInput.dayOfWeek, alartDate as string);
  };

  const notifyAdded = (key: number, scheduleInput: IScheduleInput) => {
    makeNotification({
      key,
      title: inputs.title,
      description: inputs.description,
      date: alartDate as string,
      dayOfWeek: JSON.parse(scheduleInput.dayOfWeek),
    });
  };

  const notifyEdited = async (scheduleInput: IScheduleInput) => {
    await deleteAllNotification({ number: item.key as number });
    await makeNotification({
      key: item.key as number,
      title: inputs.title,
      description: inputs.description,
      date: alartDate as string,
      dayOfWeek: JSON.parse(scheduleInput.dayOfWeek),
    });
  };

  const save = async (scheduleInput: IScheduleInput) => {
    if (title === 'Add') {
      const key = await addSchedule(scheduleInput);

      if (key && Platform.OS === 'ios') notifyAdded(key, scheduleInput);

      return;
    }

    await editSchedule({
      ...scheduleInput,
      key: item.key as number,
      isActive: 1,
    });

    if (Platform.OS === 'ios') await notifyEdited(scheduleInput);
  };

  const submit = async () => {
    if (!checkValidate()) return false;

    const scheduleInput = buildScheduleInput({
      title: inputs.title,
      description: inputs.description,
      tagList,
      city,
      date,
      alartDate,
      dayOfWeek,
    });

    const days = await resolveDays(scheduleInput);

    // 지난 시각으로 하루짜리 알람을 잡으려 한 경우입니다.
    if (days === null) return false;

    try {
      await save({ ...scheduleInput, dayOfWeek: days });
    } catch (e) {
      console.error(e);

      return false;
    }

    // 저장이 끝났으니 다른 화면(홈 목록)이 다시 불러오도록 알립니다.
    scheduleStore.emitChanged();

    return true;
  };

  return {
    ...citySearch,
    inputs,
    tagList,
    date,
    dayOfWeek,
    isTitleInputValid,
    setAlartDate,
    handleChange,
    onSelectTag,
    onDaySelect,
    onChangeDate,
    onSubmit: submit,
  };
}
