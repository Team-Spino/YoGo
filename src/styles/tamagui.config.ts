import { createTamagui, createTokens, createFont } from '@tamagui/core';

/**
 * Phase 4 디자인 시스템 — Refined Violet + 시스템 연동 다크 모드.
 *
 * 색은 컴포넌트에서 테마 토큰(`$background`, `$color`, `$accent` …)으로만
 * 참조합니다. 그래야 다크 모드에서 값이 자동으로 뒤집힙니다. 브랜드 보라는
 * 기존 #6564CC를 세련되게 승격한 #6D5DF6입니다. 태그(카테고리) 색은 의미 색이라
 * 테마와 무관하게 리터럴로 둡니다(TAG_COLOR).
 */
const tokens = createTokens({
  color: {
    // 브랜드 포인트(선택/상호작용에만 절제해서)
    violet: '#6D5DF6',
    violetPress: '#5A4BD8',
    violetLight: '#9C8FFF',
    // 라이트: 따뜻한 오프화이트 페이지 + 잉크 블랙 (에디토리얼)
    page: '#FBFAF7',
    white: '#FFFFFF',
    tint: '#F2F0E9',
    tintHover: '#ECEAE1',
    ink: '#14140F',
    inkSubtle: '#8A867A',
    inkMuted: '#B4B0A4',
    line: '#EAE8E0',
    lineStrong: '#DBD8CE',
    // 다크: 잉크 페이지 + 웜 화이트 텍스트
    night: '#0F0E0C',
    nightCard: '#1A1915',
    nightHover: '#201E18',
    nightInk: '#F4F2EC',
    nightInkSubtle: '#9A968A',
    nightLine: '#26241E',
    nightLineStrong: '#35322A',
    transparent: 'transparent',
  },
  space: {
    0: 0,
    1: 4,
    2: 8,
    2.5: 10,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    true: 8,
  },
  size: {
    0: 0,
    1: 4,
    2: 8,
    2.5: 10,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    true: 8,
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    round: 999,
    true: 12,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    true: 0,
  },
});

// .ttf 번들이 없어 시스템 폴백. 이름만 지정합니다.
const notoSans = createFont({
  family: 'Noto Sans KR',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    true: 16,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 22,
    4: 24,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    true: 22,
  },
  weight: {
    4: '400',
    5: '500',
    7: '700',
    true: '400',
  },
});

// 컴포넌트가 참조하는 테마 토큰. 키 집합은 light/dark가 동일해야 합니다.
const light = {
  background: tokens.color.page,
  backgroundStrong: tokens.color.tint,
  backgroundHover: tokens.color.tintHover,
  card: tokens.color.white,
  color: tokens.color.ink,
  colorSubtle: tokens.color.inkSubtle,
  colorMuted: tokens.color.inkMuted,
  borderColor: tokens.color.line,
  borderColorStrong: tokens.color.lineStrong,
  accent: tokens.color.violet,
  accentPress: tokens.color.violetPress,
  onAccent: tokens.color.white,
  // 에디토리얼 1차 액션(잉크 버튼)에 쓰는 표면/글자.
  ink: tokens.color.ink,
  onInk: tokens.color.page,
};

const dark = {
  background: tokens.color.night,
  backgroundStrong: tokens.color.nightCard,
  backgroundHover: tokens.color.nightHover,
  card: tokens.color.nightCard,
  color: tokens.color.nightInk,
  colorSubtle: tokens.color.nightInkSubtle,
  colorMuted: tokens.color.inkSubtle,
  borderColor: tokens.color.nightLine,
  borderColorStrong: tokens.color.nightLineStrong,
  accent: tokens.color.violetLight,
  accentPress: tokens.color.violet,
  onAccent: tokens.color.white,
  ink: tokens.color.nightInk,
  onInk: tokens.color.night,
};

export const config = createTamagui({
  tokens,
  themes: { light, dark },
  fonts: {
    body: notoSans,
    heading: notoSans,
  },
  defaultFont: 'body',
  settings: {
    // color/backgroundColor에 임의의 hex 문자열(태그 색 등)도 그대로 허용합니다.
    fastSchemeChange: true,
  },
});

export type AppTamaguiConfig = typeof config;

declare module '@tamagui/core' {
  // 앱 전역에서 토큰/테마 자동완성이 되도록 커스텀 config를 등록합니다.
  // (Tamagui가 요구하는 모듈 확장 패턴 — 빈 인터페이스가 의도된 형태입니다.)
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}
