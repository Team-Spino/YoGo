import React, { useState } from 'react';
import {
  ScheduleCardHeader,
  ScheduleCardContent,
  DetailModal,
  DayOfWeek,
} from 'components';
import { IScheduleProps } from 'types';
import * as S from './style';

export function ScheduleCard({ schedule }: { schedule: IScheduleProps }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEnable, setIsEnable] = useState<boolean>(true);

  const onTogglePress = () => setIsEnable(state => !state);
  const onShowDetailPress = () => setIsVisible(true);
  const onCloseDetailPress = () => setIsVisible(false);

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
  } = schedule;

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
        schedule={schedule}
      />
    </>
  );
}
