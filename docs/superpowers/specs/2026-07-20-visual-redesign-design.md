# Phase 4 — Visual Redesign (Refined Violet + Dark Mode)

작성일: 2026-07-20
브랜치: `upgrade/rn-086-new-arch`
선행: Phase 3(Tamagui 도입) 완료. 모든 스타일이 Tamagui 프리미티브 + 인라인 props.

## 목표

리뉴얼의 마지막 단계. 승인된 방향 **A · Refined Violet**로 비주얼을 최신화하고,
**시스템 연동 다크 모드**를 넣는다. 지금은 색이 리터럴 hex로 박혀 있어 다크 모드가
자동으로 뒤집히지 않으므로, 색을 **테마 토큰 참조로 전환**하는 것이 핵심 작업이다.

## 팔레트 (Refined Violet)

### Light
| 토큰 | 값 | 용도 |
|---|---|---|
| `accent` | `#6D5DF6` | 브랜드(기존 #6564CC를 세련되게 승격) |
| `accentPress` | `#5A4BD8` | 눌림 |
| `background` | `#FFFFFF` | 페이지 |
| `backgroundStrong` | `#F4F2FF` | 카드/보조 표면(연보라 틴트) |
| `backgroundHover` | `#EEEBFB` | 호버/눌림 표면 |
| `color` | `#1A1730` | 본문 |
| `colorSubtle` | `#6B6880` | 보조 텍스트 |
| `colorMuted` | `#A8A6B8` | 힌트/placeholder |
| `borderColor` | `#ECEAF5` | 기본 경계 |
| `borderColorStrong` | `#DAD7EA` | 강조 경계 |

### Dark (시스템 연동)
| 토큰 | 값 |
|---|---|
| `accent` | `#9C8FFF` |
| `accentPress` | `#8578F0` |
| `background` | `#16151F` |
| `backgroundStrong` | `#211F2E` |
| `backgroundHover` | `#2A2838` |
| `color` | `#F2F1F7` |
| `colorSubtle` | `#A8A6BC` |
| `colorMuted` | `#6B6880` |
| `borderColor` | `#2A2838` |
| `borderColorStrong` | `#3A3750` |

**태그 색(8개 점)은 그대로 둔다** — 의미(카테고리) 색이라 테마와 무관.
색 값 미세조정은 구현 중 시뮬레이터를 보며 잡는다.

## 접근

### 1. config — `src/styles/tamagui.config.ts`
- 위 토큰으로 light/dark 테마를 실값으로 채운다.
- 기존 최소 테마 키를 위 집합으로 확장. `accent`/`accentPress` 추가.

### 2. 색 리터럴 → 테마 토큰 전환 (핵심, ~59 컴포넌트)
컴포넌트 인라인 props의 색 리터럴을 테마 토큰으로 바꾼다:
- 브랜드 보라(`#6564CC`, `#6D5DF6`, `#6564cc`, `' #6564CC'` 등) → `$accent`
- 흰 배경(`#fff`, `#FFFFFF`, `#FCFCFC`) → `$background`
- 카드 틴트(`#EEEEEE`, `#F4F2FF`, `#F6F5FF`) → `$backgroundStrong`
- 검정 본문(`#000`, `#000000`, `#1A1A1A`, `#231F20`) → `$color`
- 회색 보조(`#999`, `#999999`, `#8A87A0`, `#555`, `#B5B5B9`) → `$colorSubtle` 또는 `$colorMuted`
- 경계(`#E6E6E6`, `#EEEEEE`, `rgba(0,0,0,0.1)`) → `$borderColor`
- RN 컴포넌트의 `style={{}}` 객체 안 색도 동일 규칙. 단 Tamagui 토큰 문자열(`$accent`)은
  RN style 객체에서 못 쓰므로, 이런 곳은 `useTheme()`로 값을 읽어 넣는다.
- **태그 색(#EB5545, #F1A33C, #EE7B70 등)은 리터럴 유지.**
- 아이콘(`IconX color="..."`) 중 브랜드/텍스트 색도 `useTheme()`로 토큰화.

### 3. 다크 모드 배선
- `App.tsx`: RN `useColorScheme()`로 `TamaguiProvider defaultTheme={scheme ?? 'light'}`.
- iOS `Info.plist`: `UIUserInterfaceStyle` 제거/Automatic로 시스템 따라가게.
- 상태바: 다크에서 밝은 글자가 되도록(가능하면) 조정 — 과하면 생략.

### 4. 리파인먼트(“refined”)
- 카드 radius 14~16으로 정리(현재 혼재값).
- 경계는 얇고 은은하게(`$borderColor`).
- 타입 위계: 제목/본문/보조를 font size 토큰으로 정리(과하지 않게).

## 데이터 흐름 / 경계
- 스타일·테마만 바뀐다. 로직/DB/네비게이션/타임존 계산 불변.
- config가 단일 진실원. 색은 컴포넌트에서 토큰만 참조 → 다크가 자동으로 뒤집힘.

## 리스크 & 완화
| 리스크 | 완화 |
|---|---|
| RN style 객체에서 토큰 문자열 못 씀 | 해당 지점은 useTheme()로 값 주입 |
| 대량 치환 중 태그색까지 토큰화(의미 훼손) | 태그 팔레트 hex 목록을 예외로 명시 |
| 다크에서 대비 부족/안 보이는 텍스트 | 시뮬레이터 light/dark 둘 다 육안 확인 |
| 아이콘 색 누락으로 다크에서 안 보임 | 아이콘 color도 토큰화 대상에 포함 |

## 검증 게이트
- tsc 0 · jest 전부 · eslint 0 error
- iOS 빌드/번들 성공
- 시뮬레이터 **light/dark 둘 다**: 온보딩/홈/타임존/추가폼/Make Schedule 레이아웃·가독성 확인

## 완료 정의
- 브랜드/배경/텍스트/경계 색이 전부 테마 토큰 참조.
- 시스템 다크 전환 시 자동으로 다크 팔레트 적용.
- Refined Violet 팔레트 적용, 카드/경계/타입 정리.
- 게이트 전부 초록불, light/dark 육안 확인.
