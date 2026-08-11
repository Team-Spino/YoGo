import { styled, View, Text } from '@tamagui/core';

/**
 * 에디토리얼 디자인 언어 — 초대형 타이포, 헤어라인 행, 넉넉한 여백, 절제된 포인트.
 * 색은 테마 토큰을 참조하므로 라이트/다크에 자동으로 맞춰집니다.
 */

// 화면 컨테이너(페이지 배경).
export const Screen = styled(View, {
  flex: 1,
  backgroundColor: '$background',
});

// 화면 히어로 타이틀(초대형).
export const Display = styled(Text, {
  color: '$color',
  fontSize: 40,
  fontWeight: '600',
  letterSpacing: -1.4,
  lineHeight: 42,
});

export const ScreenTitle = styled(Text, {
  color: '$color',
  fontSize: 26,
  fontWeight: '600',
  letterSpacing: -0.6,
});

export const Eyebrow = styled(Text, {
  color: '$colorSubtle',
  fontSize: 13,
});

export const Meta = styled(Text, {
  color: '$colorSubtle',
  fontSize: 13,
});

export const CardName = styled(Text, {
  color: '$color',
  fontSize: 17,
  fontWeight: '500',
});

// 헤어라인으로 구분되는 리스트 행(카드 대신).
export const HairRow = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 18,
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
});

// 여전히 표면이 필요한 곳(모달/시트)용 카드.
export const Card = styled(View, {
  backgroundColor: '$card',
  borderRadius: 20,
  borderWidth: 0.5,
  borderColor: '$borderColor',
});

// 에디토리얼 1차 액션 — 잉크(블랙) 필 버튼.
export const InkButton = styled(View, {
  height: 56,
  borderRadius: 28,
  backgroundColor: '$ink',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
});

export const InkButtonText = styled(Text, {
  color: '$onInk',
  fontSize: 16,
  fontWeight: '500',
});
