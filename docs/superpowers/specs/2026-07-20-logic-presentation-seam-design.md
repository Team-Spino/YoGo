# Phase 2 — 로직↔프레젠테이션 이음새 정리

## 배경

YoGo 리뉴얼은 4단계로 나뉜다: (1) 플랫폼 업그레이드(RN 0.81+/New Arch),
(2) 로직 분리·응집도, (3) Tamagui 디자인 시스템, (4) 비주얼 리뉴얼.
이 문서는 **(2)** 의 spec이다.

Phase 3~4가 프레젠테이션 계층을 통째로 Tamagui로 다시 쓴다. 그래서 Phase 2는
프레젠테이션 경계를 다듬는 데 시간을 쓰지 않는다. 대신 **살아남는 계층**
(로직·데이터 훅·데이터 흐름)을 깨끗이 해서, Phase 3의 재작성이 얇은 로직
계층에 그냥 꽂히게 한다.

이미 앞선 작업(PR #168)에서 repository 계층, `useCitySearch`,
`useScheduleForm`, timeZone/scheduleForm utils로 많은 로직이 분리되어 있다.
이 브랜치는 그 위에 스택된다.

## 목표

- 화면이 데이터를 직접 오케스트레이션하지 않는다 (fetch·상태·새로고침을 훅 뒤로).
- 전역 불린 캐시 무효화(`PopContext` + `setPop(true)`) 제거.
- `selectedDay` prop drilling(6~7단계) 제거.
- 컴포넌트에 남은 계산 로직을 훅/util로.

## 비목표 (Phase 3로 미룸)

- atom/molecule 재분류 (`ModalTimeInfo`는 폴더 그대로 두고 로직만 뺀다).
- `SwipeContent`→`ScheduleCard` 계층 역전 수정.
- 스타일링/디자인 토큰.

## 설계

### 1. 데이터 훅

```
useSchedules(selectedDay: string)
  → { schedules, markedDates, removeSchedule }
```
캡슐화: `initScheduleTable` · `findSchedulesByDay` · `findScheduleDays`
→ `splitScheduleDays` / `getDatesForWeekdays` → `markedDates` · 삭제+알림 정리.
`templates/Home`의 `initDB`/`markedDB`/`onDeleteTarget` 오케스트레이션을 대체한다.

```
useTimezones()
  → { timezones, addTimezone, removeTimezone }
```
캡슐화: `initTimezoneTable` · `findTimezones` · `addTimezone` · `removeTimezone`
+ `cardState`. `templates/TimeZone`의 오케스트레이션을 대체한다.

두 훅 모두 화면은 "데이터 + 액션"만 구조분해로 받는다.

### 2. 변경 통지 스토어 (`PopContext` 대체)

무의존 모듈 레벨 이벤트 스토어:

```
scheduleStore
  subscribe(listener): unsubscribe
  emitChanged(): void
```

`useSchedules`가 마운트 시 구독하고 `emitChanged`가 오면 재조회한다.
일정 저장/수정/삭제 흐름(`useScheduleForm`, `useSchedules.removeSchedule`)이
`emitChanged()`를 부른다. `PopContext`와 `setPop(true)` 전역 불린은 삭제한다.
timezone도 필요하면 같은 패턴의 `timezoneStore`를 둔다(추가/삭제가 같은 화면
안이라 우선은 훅 내부 상태로 충분하면 생략).

### 3. `SelectedDayContext`

```
SelectedDayProvider  (Home/Main 상단)
useSelectedDay() → { selectedDay, setSelectedDay }
```

`selectedDay`를 props로 6~7단계 흘려보내던 것을 context 직접 읽기로 바꾼다.
깊은 소비자(`ModalTimeInfo` 등)가 context에서 읽는다. 작고 집중된 context이며
Phase 3에서도 생존한다.

### 4. 컴포넌트 로직 추출

- `atoms/ModalTimeInfo`: `useTimeZone` 기반 시각 계산을 훅/util로 빼내
  프레젠테이션만 남긴다(계산된 문자열을 받는다). 폴더 위치·이름은 유지.
- 컴포넌트 본문에 남은 날짜/포맷 계산이 있으면 util로 옮긴다.

### 데이터 흐름 (Phase 2 후)

```
SQLite ─ repository(db/*) ─ 데이터 훅(useSchedules/useTimezones) ─ 화면(얇음)
                               ↑
                     scheduleStore(변경 이벤트) ← 저장/수정/삭제가 통지
selectedDay: SelectedDayContext → 깊은 소비자가 직접 읽음
```

## 검증

- 각 데이터 훅: `react-test-renderer` 렌더 하네스 + db mock 테스트.
- 추출 util/store: 순수 단위 테스트.
- 전체 tsc 0 / lint 0 / jest green 유지.
- 실기기(시뮬레이터)에서 홈 일정 목록·삭제, 타임존 추가·삭제, 저장 후
  자동 반영을 회귀 확인.

## 구현 순서 (TDD)

1. `scheduleStore` (이벤트 버스) — 순수, 테스트 먼저.
2. `useTimezones()` — 테스트 → `templates/TimeZone` 이관.
3. `useSchedules(selectedDay)` — 테스트 → `templates/Home` 이관, store 연결.
4. 저장/수정/삭제 흐름을 `emitChanged()`로 연결, `PopContext` 제거.
5. `SelectedDayContext` — provider + 깊은 소비자 이관, drilling 제거.
6. `ModalTimeInfo` 로직 추출 → 프레젠테이션화.
7. tsc/lint/jest + 실기기 검증.
