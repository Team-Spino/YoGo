import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTimeZone } from 'hooks';
import * as S from './style';

const dataSet = [
  'Pacific/Midway',
  'Pacific/Niue',
  'America/Anchorage',
  'America/Juneau',
  'America/Yakutat',
  'America/Nome',
  'America/Adak',
  'America/Metlakatla',
  'Pacific/Honolulu',
  'Pacific/Rarotonga',
  'Pacific/Tahiti',
  'Pacific/Marquesas',
  'America/Los_Angeles',
  'America/Vancouver',
  'America/Whitehorse',
  'America/Dawson',
  'America/Belize',
  'Africa/Cairo',
  'Africa/Harare',
  'Africa/Johannesburg',
  'Europe/Moscow',
  'Europe/Volgograd',
  'Europe/Kirov',
  'Europe/Astrakhan',
  'Europe/Saratov',
  'Europe/Ulyanovsk',
  'Europe/Samara',
  'Asia/Yekaterinburg',
  'Asia/Omsk',
  'Asia/Novosibirsk',
  'Asia/Barnaul',
  'Asia/Tomsk',
  'Asia/Novokuznetsk',
  'Asia/Krasnoyarsk',
  'Asia/Irkutsk',
  'Asia/Chita',
  'Asia/Yakutsk',
  'Asia/Khandyga',
  'Asia/Vladivostok',
  'Asia/Ust-Nera',
  'Asia/Magadan',
  'Asia/Sakhalin',
  'Asia/Srednekolymsk',
  'Asia/Kamchatka',
  'Asia/Anadyr',
  'Europe/Belgrade',
  'Europe/Bratislava',
  'Europe/Budapest',
  'Europe/Ljubljana',
  'Europe/Prague',
  'Europe/Sarajevo',
  'Europe/Skopje',
  'Europe/Warsaw',
  'Europe/Zagreb',
  'Europe/Brussels',
  'Europe/Copenhagen',
];

function Example({ location }: { location: string }) {
  const { getCurrentTimeZone } = useTimeZone();
  const { time, dateDifference, timeDifference } = getCurrentTimeZone({
    selectedTimeZone: location,
  });
  return (
    <View>
      <Text>{location}</Text>
      <Text>{time}</Text>
      <Text>{dateDifference}</Text>
      <Text>{timeDifference}</Text>
    </View>
  );
}

export function Home() {
  return (
    <S.Container>
      <S.Title>Home</S.Title>
      <ScrollView>
        {dataSet.map((location, i) => (
          <Example key={i} location={location} />
        ))}
      </ScrollView>
    </S.Container>
  );
}
