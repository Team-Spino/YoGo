import { styled, View, Text } from '@tamagui/core';

/**
 * 리디자인 공용 프리미티브 — 앱 전체가 같은 디자인 언어를 쓰도록 모읍니다.
 * 색은 테마 토큰을 참조하므로 라이트/다크에 자동으로 맞춰집니다.
 */

// 페이지 위로 살짝 떠 있는 카드. 라이트에선 그림자가, 다크에선 밝은 표면이 들어올립니다.
export const Card = styled(View, {
  backgroundColor: '$card',
  borderRadius: 18,
  borderWidth: 0.5,
  borderColor: '$borderColor',
  shadowColor: '#4A3F9E',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.1,
  shadowRadius: 16,
});

// 화면 컨테이너(페이지 배경 + 넉넉한 좌우 여백).
export const Screen = styled(View, {
  flex: 1,
  backgroundColor: '$background',
});

// 타이포 스케일.
export const ScreenTitle = styled(Text, {
  color: '$color',
  fontSize: 24,
  fontWeight: '500',
  letterSpacing: -0.4,
});

export const Eyebrow = styled(Text, {
  color: '$colorSubtle',
  fontSize: 13,
});

export const CardName = styled(Text, {
  color: '$color',
  fontSize: 15,
  fontWeight: '500',
});

export const Meta = styled(Text, {
  color: '$colorSubtle',
  fontSize: 12,
});
