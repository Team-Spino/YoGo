import { createTamagui, createTokens, createFont } from '@tamagui/core';

/**
 * Phase 3 디자인 시스템 토큰.
 *
 * 구조는 최신화하되(제대로 된 스케일 + light/dark 테마), 값은 지금 화면과
 * 똑같게 맞춰 둡니다. 새 비주얼 값은 Phase 4에서 이 파일만 바꾸면 됩니다.
 * 색/간격은 현재 컴포넌트에 하드코딩돼 있던 값들을 그대로 담았습니다.
 */
const tokens = createTokens({
  color: {
    white: '#FCFCFC',
    lightGray: '#EEEEEE',
    border: '#E6E6E6',
    gray: '#999999',
    darkGray: '#555555',
    black: '#1A1A1A',
    blue: '#6564CC',
    transparent: 'transparent',
  },
  // 4pt 기반. 현재 코드에 흔한 8/10/12/16/20/24를 포함합니다.
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
    4: 20,
    round: 999,
    true: 8,
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

// light: 현재값 매핑. dark: 구조만(값은 light와 동일하게 시작 — Phase 4에서 실값).
const light = {
  background: tokens.color.white,
  backgroundStrong: tokens.color.lightGray,
  color: tokens.color.black,
  colorSubtle: tokens.color.gray,
  borderColor: tokens.color.border,
  accent: tokens.color.blue,
};

const dark = { ...light };

export const config = createTamagui({
  tokens,
  themes: { light, dark },
  fonts: {
    body: notoSans,
    heading: notoSans,
  },
  defaultFont: 'body',
  settings: {
    // color/backgroundColor에 임의의 hex 문자열(동적 값 포함)을 그대로 허용합니다.
    // Phase 3는 현재값(리터럴 hex)을 유지하므로 토큰 강제는 켜지 않습니다.
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
