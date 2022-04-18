import React from 'react';
import uuid from 'react-native-uuid';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FloatingButton, ScheduleCard } from 'components';
import { IconPlus } from 'assets';
import * as S from './style';

const DUMMY_DATA = [
  {
    id: 1,
    title: '팀 스피노 프로젝트 2차 스크럼',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officia nam exercitationem iure illum cupiditate minus numquam quibusdam nobis adipisci dolor, repellat quisquam iste sunt dignissimos ab praesentium possimus at.',
    tagColor: '#e5565e',
    target: {
      time: '09 : 00',
      local: 'Seoul',
      day: '2022.03.21',
    },
    cur: {
      time: '19 : 00',
      local: 'London',
      day: '2022.03.20',
    },
    dayOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 2,
    title: '카카오 개발자 미팅',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officia nam exercitationem iure illum cupiditate minus numquam quibusdam nobis adipisci dolor, repellat quisquam iste sunt dignissimos ab praesentium possimus at.',
    tagColor: '#FBE864',
    target: {
      time: '18 : 00',
      local: 'New York',
      day: '2022.03.24',
    },
    cur: {
      time: '9 : 00',
      local: 'London',
      day: '2022.03.24',
    },
    dayOfWeek: ['Tue', 'Wed', 'Fri', 'Sat'],
  },
  {
    id: 3,
    title: 'FaceBook 압둘 자바 미팅',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officia nam exercitationem iure illum cupiditate minus numquam quibusdam nobis adipisci dolor, repellat quisquam iste sunt dignissimos ab praesentium possimus at.',
    tagColor: '#5FA3F8',
    target: {
      time: '19 : 00',
      local: 'San Francisco',
      day: '2022.03.25',
    },
    cur: {
      time: '10 : 00',
      local: 'London',
      day: '2022.03.24',
    },
    dayOfWeek: ['Tue', 'Fri', 'Sat'],
  },
  {
    id: 4,
    title: 'Apple 스티브 잡스와의 미팅',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officia nam exercitationem iure illum cupiditate minus numquam quibusdam nobis adipisci dolor, repellat quisquam iste sunt dignissimos ab praesentium possimus at.',
    tagColor: '#F5BE5B',
    target: {
      time: '10 : 00',
      local: 'Los Angeles',
      day: '2022.03.25',
    },
    cur: {
      time: '10 : 00',
      local: 'London',
      day: '2022.03.24',
    },
    dayOfWeek: ['Sat'],
  },
  {
    id: 5,
    title: '아마존 제프 베이조스와의 미팅',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officia nam exercitationem iure illum cupiditate minus numquam quibusdam nobis adipisci dolor, repellat quisquam iste sunt dignissimos ab praesentium possimus at.',
    tagColor: '#CB88F8',
    target: {
      time: '10 : 00',
      local: 'Seattle',
      day: '2022.03.24',
    },
    cur: {
      time: '08 : 00',
      local: 'London',
      day: '2022.03.24',
    },
    dayOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 6,
    title: '테슬라 도지코인 시위',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officia nam exercitationem iure illum cupiditate minus numquam quibusdam nobis adipisci dolor, repellat quisquam iste sunt dignissimos ab praesentium possimus at.',
    tagColor: '#CB88F8',
    target: {
      time: '10 : 00',
      local: 'Los Angeles',
      day: '2022.03.24',
    },
    cur: {
      time: '08 : 00',
      local: 'London',
      day: '2022.03.24',
    },
    dayOfWeek: ['Sun', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 6,
    title: '테슬라 도지코인 시위',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officia nam exercitationem iure illum cupiditate minus numquam quibusdam nobis adipisci dolor, repellat quisquam iste sunt dignissimos ab praesentium possimus at.',
    tagColor: '#CB88F8',
    target: {
      time: '10 : 00',
      local: 'Los Angeles',
      day: '2022.03.24',
    },
    cur: {
      time: '08 : 00',
      local: 'London',
      day: '2022.03.24',
    },
    dayOfWeek: ['Sun', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 6,
    title: '테슬라 도지코인 시위',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officia nam exercitationem iure illum cupiditate minus numquam quibusdam nobis adipisci dolor, repellat quisquam iste sunt dignissimos ab praesentium possimus at.',
    tagColor: '#CB88F8',
    target: {
      time: '10 : 00',
      local: 'Los Angeles',
      day: '2022.03.24',
    },
    cur: {
      time: '08 : 00',
      local: 'London',
      day: '2022.03.24',
    },
    dayOfWeek: ['Sun', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 6,
    title: '테슬라 도지코인 시위',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officia nam exercitationem iure illum cupiditate minus numquam quibusdam nobis adipisci dolor, repellat quisquam iste sunt dignissimos ab praesentium possimus at.',
    tagColor: '#CB88F8',
    target: {
      time: '10 : 00',
      local: 'Los Angeles',
      day: '2022.03.24',
    },
    cur: {
      time: '08 : 00',
      local: 'London',
      day: '2022.03.24',
    },
    dayOfWeek: ['Sun', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 6,
    title: '테슬라 도지코인 시위',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officia nam exercitationem iure illum cupiditate minus numquam quibusdam nobis adipisci dolor, repellat quisquam iste sunt dignissimos ab praesentium possimus at.',
    tagColor: '#CB88F8',
    target: {
      time: '10 : 00',
      local: 'Los Angeles',
      day: '2022.03.24',
    },
    cur: {
      time: '08 : 00',
      local: 'London',
      day: '2022.03.24',
    },
    dayOfWeek: ['Sun', 'Thu', 'Fri', 'Sat'],
  },
];

export function Home() {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Inner>
          {DUMMY_DATA.map(data => (
            <ScheduleCard key={uuid.v4()} data={data} />
          ))}
        </S.Inner>

        <FloatingButton>
          <IconPlus />
        </FloatingButton>
      </S.Wrapper>
    </S.Container>
  );
}
