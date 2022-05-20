import React, { useState } from 'react';
import {
  ScheduleCardHeader,
  ScheduleCardContent,
  DetailModal,
  DayOfWeek,
} from 'components';
import { connectDB, updateScheduleItemActive, getAllSchedule } from 'db';
import { useNotification } from 'hooks';
import { IScheduleProps } from 'types';
import * as S from './style';

interface IScheduleCardProps {
  schedule: IScheduleProps;
  selectedDay: string;
}

export function ScheduleCard({ schedule, selectedDay }: IScheduleCardProps) {
  const {
    key,
    TITLE,
    TAG_COLOR,
    TARGET_TIME,
    TARGET_CITY,
    TARGET_DAY,
    CUR_TIME,
    CUR_CITY,
    CUR_DAY,
    DAY_OF_WEEK,
    IS_ACTIVE,
  } = schedule;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEnable, setIsEnable] = useState<boolean>(IS_ACTIVE ? true : false);
  const { handleScheduleToggle } = useNotification();

  const onTogglePress = async () => {
    const db = await connectDB();
    await updateScheduleItemActive(db, key, isEnable ? 0 : 1);
    handleScheduleToggle({
      number: Number(key),
      isActive: isEnable ? false : true,
      schedule,
    });
    setIsEnable(!isEnable);
  };

  const onShowDetailPress = () => setIsVisible(true);
  const onCloseDetailPress = () => setIsVisible(false);

  const target = { TARGET_TIME, TARGET_CITY, TARGET_DAY };
  const cur = { CUR_TIME, CUR_CITY, CUR_DAY };

  return (
    <>
      <S.Container onPress={onShowDetailPress}>
        <S.Wrapper>
          <ScheduleCardHeader
            isEnable={isEnable}
            title={TITLE}
            tagColor={TAG_COLOR}
          />
          <ScheduleCardContent
            isEnable={isEnable}
            onTogglePress={onTogglePress}
            target={target}
            cur={cur}
          />
          <DayOfWeek
            isEnable={isEnable}
            selectedDay={JSON.parse(DAY_OF_WEEK)}
          />
        </S.Wrapper>
      </S.Container>
      <DetailModal
        isVisible={isVisible}
        onCloseDetailPress={onCloseDetailPress}
        selectedDay={selectedDay}
        schedule={schedule}
      />
    </>
  );
}
