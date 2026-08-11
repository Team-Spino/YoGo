# Phase 1 — 플랫폼 업그레이드 (RN 0.72.10 → 0.86, New Architecture)

리뉴얼 4단계 중 (1). 목표는 New Architecture 위의 최신 RN으로 올려, Phase 3의
Tamagui(0.81+/New Arch 필수)와 이후 리뉴얼의 토대를 만드는 것.

## 확정 사실 (조사)

- RN 0.81이 구 아키텍처를 켜둘 수 있는 마지막 버전, **0.82부터 New Arch 강제**,
  0.86은 bridgeless 기본. 목표는 **0.86** → 구 아키텍처 폴백 없음.
- Tamagui 2는 RN 0.81+/New Arch/React 19/TS 5 요구.
- Reanimated 4 = New Arch 전용, worklets가 `react-native-worklets`로 분리.
- **react-native-sqlite-storage는 유지보수 중단 + RN 0.81 초과 비호환 → 교체 필수.**
- react-native-push-notification / splash-screen: 유지보수 중단 → 교체.

## 전략: 신규 프로젝트 + 이식 (A)

깨끗한 RN 0.86 네이티브 셸을 새로 뽑아 현재 브랜치로 들여오고, 잘 격리해둔
`src/`는 그대로 쓴다. 14버전치 네이티브 diff를 손으로 맞추지 않는다.
Phase 2에서 로직을 프레젠테이션·플랫폼과 분리해둔 덕에 `src/`가 플랫폼에 거의
안 물려 있어 이식이 깨끗하다.

## 목표 버전

react-native 0.86 · react 19 · typescript 5 · New Architecture(bridgeless)

## 의존성 계획

| 현재 | 조치 | 목표 |
|---|---|---|
| react-native 0.72.10 | 업그레이드 | 0.86 |
| react 18.2 | 업그레이드 | 19 |
| typescript 4.8 | 업그레이드 | 5.x |
| **sqlite-storage 6.0.1** | **교체** | **op-sqlite** (JSI, New Arch) |
| **push-notification 8.1 + community/ios** | **교체** | **@notifee/react-native** (iOS 로컬 알림) |
| **splash-screen 3.3** | **교체** | **react-native-bootsplash** |
| **mmkv 2.11** | 메이저 범프 | **4.x** (New Arch 필수) |
| **reanimated 3.7** | 메이저 범프 | **4.x + react-native-worklets** |
| gesture-handler 2.4 | 범프 | 3.x |
| screens 3.13 | 범프 | 4.x |
| safe-area-context 4.2 | 범프 | 5.x |
| svg 12.3 | 범프 | 15.x |
| @react-navigation/* 6 | 메이저 범프 | 7.x |
| react-native-modal 13 | 범프 | 14 |
| datetimepicker 7.6 | 범프 | 9.x |
| react-native-calendars 1.1303 | 범프 | 1.1314 |
| @gorhom/portal 1.0.13 | 범프 | 1.0.14 |
| swipe-list-view 3.2.9 | 유지(재평가) | New Arch에서 깨지면 Swipeable로 |
| swiper 1.6-rc | 유지(재평가) | 깨지면 pager-view로 (온보딩은 Phase 4) |
| styled-components 5.3 | 임시 유지 | Phase 3에서 Tamagui로 제거. React 19에서 깨지면 v6 범프 또는 Phase 3 제거를 앞당김 |
| dayjs, react-native-uuid | 유지 | JS 전용 |

## 격리 덕에 좁아지는 교체 범위

- **op-sqlite**: `db.executeSql(q, params)` → `db.execute(q, params)`. repository가 SQL을
  격리해 `db/connectDB.ts` + 원시 함수(schedule/timezone/alarmPermission)만 바뀐다.
  훅·화면·테스트 상위는 그대로. jest의 sqlite 목만 갱신.
- **Notifee**: `useNotification` 하나에 격리. Android는 이미 꺼져 있어 iOS 로컬 알림만.
- **bootsplash**: App.tsx + 네이티브 설정.
- **mmkv v4**: `utils/mmkv.ts` 한 곳.

## 이식 순서 (각 단계 검증 후 진행)

1. 신규 0.86 앱을 임시 위치에 스캐폴드 → 네이티브 셸(ios/·android/·루트 설정)을
   이 브랜치로 들여오고 `src/` 유지. package.json 병합.
2. 의존성 재설치(New Arch 버전 + 교체판). pod install(New Arch).
3. db 계층을 op-sqlite로 재작성(repository 격리). jest 목 갱신.
4. useNotification을 Notifee로 재작성.
5. splash → bootsplash. mmkv v4.
6. @react-navigation 6→7 API 변경 반영.
7. reanimated 4 + worklets(바벨 플러그인 교체) 설정.
8. iOS(New Arch) 빌드 → 시뮬레이터 회귀: 홈 일정, 타임존, 상세 모달,
   추가/수정/삭제, 알림.
9. 전 과정 tsc/lint/jest green 유지(jest preset을 0.86용으로 갱신).

## 위험

- 신규 init 툴체인(Ruby/CocoaPods/Xcode 26).
- op-sqlite API 차이(트랜잭션, async).
- Notifee 동작 파리티(반복 스케줄·취소) — 실기기 검증 필수(jest 불가).
- styled-components ↔ React 19 상호작용.
- 테스트 151개: RN 0.86 jest preset + New Arch 목.

## 검증

tsc/lint/jest green + 지금까지 확인한 모든 흐름의 시뮬레이터 회귀.
