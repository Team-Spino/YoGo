# Phase 3 — Tamagui Design System (설계)

작성일: 2026-07-20
브랜치: `upgrade/rn-086-new-arch` (Phase 1 위에 이어서)
선행: Phase 1(RN 0.86 New Arch) 완료·검증됨. Phase 2(로직↔프레젠테이션 분리) 완료됨.

## 목표

styled-components v5로 되어 있는 스타일 계층을 **Tamagui로 전면 이관**한다.
동시에 지금의 빈약한 "디자인 시스템"(색 3개·폰트 1개)을 **제대로 된 토큰 구조로
최신화**한다. 단, **화면 모양은 지금과 똑같이 유지**한다 — 새 비주얼 값은 Phase 4에서.

이 단계가 끝나면:

- styled-components가 코드베이스에서 완전히 사라진다.
- 모든 스타일은 Tamagui 위에서 돈다.
- 색/간격/크기/라운드/타이포/z-index가 토큰 스케일로 정의되고, light/dark
  테마 구조가 준비된다(값은 현재값 매핑, 다크 테마 실값은 Phase 4).
- Phase 4는 "구조 이관"이 아니라 "토큰 값 교체 + 레이아웃/모션"에만 집중할 수 있다.

## 범위 밖 (non-goals)

- 새 색 팔레트·타이포그래피 등 **비주얼 변경** → Phase 4.
- 레이아웃 재배치, 모션/애니메이션 추가 → Phase 4.
- Tamagui UI 킷(`tamagui` 프리빌트 컴포넌트) 도입 → 필요 시 Phase 4에서 판단.
  Phase 3는 `@tamagui/core`의 `styled()`와 프리미티브(`View`/`Text`/`Stack`)만 쓴다.
- op-sqlite 데이터 마이그레이션(별도 배포 선행 과제, 이 스펙과 무관).

## 접근 (패턴 A: `styled()` 1:1 포팅)

각 `components/**/style.tsx`(styled-components)를 Tamagui `styled()`로 **같은 이름·
같은 리터럴 px 값**으로 옮긴다. 소비하는 `index.tsx`는 `import * as S from './style'`
그대로 두어 변경을 최소화한다.

예:

```tsx
// before — styled-components/native
import styled from 'styled-components/native';
export const Container = styled.View`
  flex-direction: row;
  padding: 0 12px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #e6e6e6;
`;

// after — Tamagui
import { styled, View } from '@tamagui/core';
export const Container = styled(View, {
  flexDirection: 'row',
  paddingHorizontal: 12,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#e6e6e6',
});
```

원칙:
- **리터럴 값 유지** — 지금 하드코딩된 px/색을 토큰으로 바꾸지 않는다(모양 보존).
  토큰 스케일은 config에 존재하되, 값 교체는 Phase 4.
- `props`로 분기하던 styled-components 패턴(`${({active}) => ...}`)은 Tamagui
  `variants`로 옮긴다.
- `theme` 참조(`${({theme}) => theme.colors.blue}`)는 해당 리터럴(`#6564CC`)로
  치환한다(현재값 유지). 테마 토큰 연결은 Phase 4.

## 아키텍처

### 1. 토큰/테마 config — `src/styles/tamagui.config.ts`

`createTamagui`로 커스텀 config를 만든다.

- `tokens`(`createTokens`): 최신화된 스케일
  - `color`: 브랜드/중립 팔레트. 현재값(`blue #6564CC`, `white #FCFCFC`,
    `lightGray #EEEEEE`, `#E6E6E6` 등 반복 등장 색) + 접근성용 명도 단계 자리.
  - `space`, `size`: 4pt 기반 스케일(`$1`=4 … ), 현재 코드에 흔한 8/10/12/16/20/24 포함.
  - `radius`: 4/8/12/20/999.
  - `zIndex`: 0/100/200/... (모달·바텀시트 계층).
- `fonts`(`createFont`): "Noto Sans KR" 하나. `.ttf` 번들 없음 → 시스템 폴백.
  weight/lineHeight/size 맵 정의.
- `themes`: `light`(현재값 매핑), `dark`(구조만 — 값은 light와 동일하게 시작,
  Phase 4에서 실제 다크값). 테마 키: `background`, `color`, `borderColor`,
  `accent`(=blue) 등 최소 집합.
- 타입: `TamaguiCustomConfig` 모듈 확장으로 `styled()` 토큰 자동완성.

`src/styles/index.ts`는 `config`와 (필요 시) 토큰 헬퍼를 re-export.

### 2. Provider — `src/App.tsx`

- `import { ThemeProvider } from 'styled-components/native'` 제거.
- `TamaguiProvider config={config} defaultTheme="light"`로 트리 감싸기.
- `PortalProvider`, context provider들은 그대로.
- BootSplash 로직 유지.

### 3. 컴포넌트 이관

`grep`로 확인된 **~59개 `style.tsx`** 를 원자→분자→유기체→템플릿 순으로 포팅.
소비 `index.tsx`는 대부분 무변경. 변경이 필요한 경우:
- styled-components 전용 prop 문법을 쓰던 곳 → Tamagui `variants` 소비로 조정.
- `ThemeProvider`/`useTheme`(styled) 사용처 → 리터럴 또는 Tamagui `useTheme`.

### 4. 정리(제거)

- deps: `styled-components`, `@types/styled-components-react-native`,
  `babel-plugin-styled-components`.
- 파일: `src/styles/styled.d.tsx`, 옛 `src/styles/theme.tsx`,
  `src/styles/global_style.ts`(사용처 확인 후), **`shim.js`** 와 `index.js`의
  `import './shim'`(Tamagui는 `document` 오판 문제 없음).
- `tsconfig.json` `types`에서 `styled-components-react-native` 제거,
  Tamagui 타입 추가 불필요(모듈 확장으로 해결).

### 5. babel — `babel.config.js`

- `babel-plugin-styled-components` 제거.
- **런타임 우선**: 초기엔 `@tamagui/babel-plugin`을 넣지 **않는다**(Tamagui는
  플러그인 없이도 동작; 컴파일러 최적화만 빠짐). 앱이 초록불이 된 뒤 별도 스텝에서
  `@tamagui/babel-plugin`을 추가한다 — 이때 `react-native-worklets/plugin`은
  반드시 **맨 마지막** 유지, Tamagui 플러그인은 그 앞.
- `module-resolver`는 그대로.

### 6. 테스트

- `src/testUtils/renderWithTamagui.tsx`: `TamaguiProvider`로 감싸는 렌더 헬퍼.
- 컴포넌트를 실제 렌더하는 소수 테스트(App-test 등)를 헬퍼로 교체.
- 훅/유틸 테스트는 스타일과 무관 → 무변경.
- `jest.setup.js`: Tamagui가 요구하는 목이 있으면 추가(대개 불필요).

## 데이터 흐름 / 경계

- 스타일 계층만 교체. 로직(hooks/stores/db/utils)·네비게이션·화면 구성은 불변.
- 각 `style.tsx`는 여전히 "그 컴포넌트의 스타일"만 담당하는 격리 단위. 공개
  인터페이스(export 이름)를 유지하므로 소비자와의 계약이 깨지지 않는다.
- config는 단일 진실원(SSOT): 토큰/테마는 `tamagui.config.ts` 한 곳에만.

## 리스크 & 완화

| 리스크 | 완화 |
|---|---|
| Tamagui × RN 0.86 New Arch 호환 | 런타임 우선(컴파일러 배제)로 표면적 축소, 시뮬레이터 조기 검증 |
| babel 플러그인 순서(worklets 마지막) | 컴파일러는 초록불 이후 별도 스텝, worklets 마지막 불변 규칙 명시 |
| `variants`로 옮길 prop 분기 누락 → 모양 틀어짐 | 화면별 시뮬레이터 육안 대조(파리티 체크) |
| 대량(~59개) 기계적 변환의 실수 | 원자→…→템플릿 계층 순 소단위 커밋, 각 단계 tsc/jest |
| 다크 테마 값 미정 | Phase 3는 구조만; dark=light 값으로 시작 |

## 검증 게이트

- `tsc --noEmit` 0
- `jest` 전부 통과
- `eslint` 에러 0
- iOS 빌드(New Arch) 성공
- 시뮬레이터에서 온보딩/홈/일정추가/타임존/디테일 모달 **모양이 이전과 동일**한지
  육안 대조(현재 스크린샷 대비).

## 완료 정의(DoD)

- 코드베이스에 `styled-components` import 0건.
- 모든 스타일이 Tamagui 위에서 동작, config 단일 SSOT.
- shim.js 제거됨.
- 위 게이트 전부 초록불, 시뮬레이터 파리티 확인.
- Phase 4(비주얼 리디자인)는 토큰 값·테마·레이아웃/모션에만 손대면 되도록 정리됨.
