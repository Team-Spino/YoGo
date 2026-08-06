import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import { View, Text } from '@tamagui/core';

const ITEM_W = 50;

interface ICalendarStripProps {
  selectedDay: string;
  markedDates: Record<string, unknown>;
  onDayPress: (day: string) => void;
}

/**
 * 기본 달력 위젯(react-native-calendars) 대신 쓰는 커스텀 날짜 스트립.
 * 월 이동은 헤더의 화살표로, 날짜는 가로 스크롤로 고릅니다. 앱 톤(에디토리얼)에
 * 맞춰 선택일은 잉크 pill, 일정 있는 날은 작은 점으로 표시합니다.
 */
export function CalendarStrip({
  selectedDay,
  markedDates,
  onDayPress,
}: ICalendarStripProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [anchor, setAnchor] = useState(() => dayjs(selectedDay).startOf('month'));

  // 부모가 다른 달의 날짜를 고르면 보이는 달도 따라갑니다.
  useEffect(() => {
    setAnchor(dayjs(selectedDay).startOf('month'));
  }, [dayjs(selectedDay).format('YYYY-MM')]);

  const days = useMemo(() => {
    const n = anchor.daysInMonth();
    return Array.from({ length: n }, (_, i) => anchor.add(i, 'day'));
  }, [anchor.format('YYYY-MM')]);

  const selectedIndex = useMemo(() => {
    const found = days.findIndex(d => d.format('YYYY-MM-DD') === selectedDay);
    return found >= 0 ? found : 0;
  }, [days, selectedDay]);

  useEffect(() => {
    const t = setTimeout(() => {
      scrollRef.current?.scrollTo({
        x: Math.max(0, selectedIndex * ITEM_W - 130),
        animated: true,
      });
    }, 40);
    return () => clearTimeout(t);
  }, [selectedIndex, anchor]);

  const shiftMonth = (delta: number) => setAnchor(prev => prev.add(delta, 'month'));

  return (
    <View paddingBottom={6}>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={20}
        marginBottom={8}
      >
        <Text fontSize={16} fontWeight="500" color="$color">
          {anchor.format('MMMM YYYY')}
        </Text>
        <View flexDirection="row" alignItems="center" gap={18}>
          <Pressable
            onPress={() => shiftMonth(-1)}
            hitSlop={12}
            style={({ pressed }) => ({ opacity: pressed ? 0.4 : 1 })}
          >
            <Text fontSize={22} color="$colorSubtle">
              ‹
            </Text>
          </Pressable>
          <Pressable
            onPress={() => shiftMonth(1)}
            hitSlop={12}
            style={({ pressed }) => ({ opacity: pressed ? 0.4 : 1 })}
          >
            <Text fontSize={22} color="$colorSubtle">
              ›
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {days.map(d => {
          const key = d.format('YYYY-MM-DD');
          const isSelected = key === selectedDay;
          const isMarked = Boolean(markedDates[key]);
          return (
            <Pressable key={key} onPress={() => onDayPress(key)}>
              <View width={ITEM_W} alignItems="center" paddingVertical={6}>
                <Text fontSize={11} color="$colorSubtle" marginBottom={7}>
                  {d.format('dd')}
                </Text>
                <View
                  width={40}
                  height={40}
                  borderRadius={999}
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={isSelected ? '$ink' : 'transparent'}
                >
                  <Text
                    fontSize={16}
                    fontWeight={isSelected ? '600' : '400'}
                    color={isSelected ? '$onInk' : '$color'}
                  >
                    {d.format('D')}
                  </Text>
                </View>
                <View
                  width={5}
                  height={5}
                  borderRadius={999}
                  marginTop={6}
                  backgroundColor={isMarked ? '$accent' : 'transparent'}
                />
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
