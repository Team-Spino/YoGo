# YOGO — 스토어 배포·심사 정보

> 리뉴얼(RN 0.86 New Arch + Tamagui 에디토리얼 디자인) 후 앱스토어/플레이스토어
> 제출에 필요한 메타데이터·스크린샷·심사 노트를 모아둔 문서입니다.
> `⚠️ TODO`가 붙은 항목은 제출 전 실제 값으로 채워야 합니다.

## 1. 앱 정보

| 항목 | 값 |
| --- | --- |
| 앱 이름 | YOGO |
| 한 줄 소개 | 다른 도시 시간에 맞춰 알람을 잡는 타임존 스케줄러 |
| iOS Bundle ID | `⚠️ TODO` — 현재 `org.reactjs.native.example.YOGO`(RN 템플릿 기본값). 제출 전 실제 ID(예: `com.teamspino.yogo`)로 변경 |
| Android applicationId | `com.yogo` |
| 버전 (Marketing) | 1.0.0 (`⚠️ TODO` package.json은 0.0.1 — 스토어 버전과 정렬 필요) |
| 빌드 번호 | iOS `CURRENT_PROJECT_VERSION` / Android `versionCode 1` |
| 최소 지원 | iOS `⚠️ TODO 확인` / Android `⚠️ TODO minSdk 확인` |
| 카테고리 | Productivity(생산성) / 보조: Utilities |
| 연령 등급 | 4+ (수집·유해 콘텐츠 없음) |

## 2. 스크린샷 / 미리보기

`docs/store/screenshots/` (iPhone 16 Pro, 1206×2622 = 6.3" 디스플레이)

| 파일 | 화면 | 설명 |
| --- | --- | --- |
| `01-home.png` | 홈(일정) | 헤어라인 일정 리스트 + 커스텀 캘린더 스트립, 활성/비활성 알람 |
| `02-world-clock.png` | 월드클락 | 여러 도시의 현재 시각 비교 |
| `03-add-schedule.png` | 일정 생성 | 제목·색 태그·목적지 타임존·날짜 선택 |
| `04-home-dark.png` | 홈(다크) | 시스템 연동 다크 테마 |

### 필요한 스크린샷 규격 (`⚠️ TODO` 아직 못 만든 사이즈)
- **iOS**
  - 6.9" (iPhone 16 Pro Max, 1320×2868) — **필수**
  - 6.5" (1284×2778 또는 1242×2688) — 권장
  - 6.3"/6.1"은 6.9"로 대체 표시 가능
  - iPad 12.9" (2048×2732) — iPad 지원 시에만
- **Android (Play)**: 폰 스크린샷 최소 2장(1080×1920 이상), 512×512 아이콘, 1024×500 피처 그래픽

> 마케팅 카피가 얹힌 프레임 버전이 필요하면 위 원본 캡처를 소스로 별도 제작.

## 3. 스토어 리스팅 메타데이터

### 한국어
- **이름**: YOGO
- **부제**: 시차 알람 · 월드클락
- **프로모션 텍스트**: 해외 회의도 놓치지 마세요. 상대 도시 시간으로 알람을 잡으면 내 시간으로 울립니다.
- **설명**:
  ```
  YOGO는 다른 도시의 시간에 맞춰 알람을 잡아주는 타임존 스케줄러입니다.

  • 목적지 도시와 시각을 고르면, 내 기기 시간으로 환산해 알람을 울려줍니다.
  • 월드클락으로 여러 도시의 현재 시각을 한눈에 비교하세요.
  • 색 태그로 일정을 분류하고, 요일 반복을 설정할 수 있습니다.
  • 계정·로그인 없이 바로 사용. 모든 데이터는 기기 안에만 저장됩니다.

  해외 팀과 일하는 사람, 유학·출장·여행자, 글로벌 라이브를 챙기는 팬에게.
  ```
- **키워드**: 타임존,시차,월드클락,세계시간,알람,해외회의,스케줄,시차계산,여행,출장

### English
- **Name**: YOGO
- **Subtitle**: Time-zone alarms & world clock
- **Promotional text**: Never miss a call across time zones — set an alarm in another city's time and it rings in yours.
- **Description**:
  ```
  YOGO is a time-zone scheduler that sets alarms in another city's local time.

  • Pick a destination city and time — YOGO converts it to your device's
    time and rings the alarm then.
  • Compare the current time across cities with the World Clock.
  • Organize schedules with color tags and weekly repeats.
  • No account, no sign-in. Everything stays on your device.

  For people working with global teams, students and travelers abroad,
  and fans keeping up with worldwide live events.
  ```
- **Keywords**: time zone,world clock,alarm,timezone,jetlag,meeting,schedule,travel,remote,global

`⚠️ TODO` Support URL / Marketing URL / Privacy Policy URL — 실제 주소 필요.

## 4. 개인정보 (App Privacy / 데이터 안전)

현재 코드 기준(분석·광고·네트워크 SDK 없음):

- **수집 데이터: 없음 (Data Not Collected).**
- 일정·타임존은 기기 내 SQLite(op-sqlite)와 MMKV에만 저장, 외부 전송 없음.
- 알람은 로컬 알림(Notifee)로만 동작, 서버 없음.
- 타임존 계산은 OS의 Intl 데이터 사용(네트워크 불필요).
- 추적(App Tracking Transparency) 사용 안 함.

`⚠️ TODO` 크래시 리포팅/분석 도구를 추후 추가하면 이 항목을 갱신할 것.

## 5. 심사 노트 (App Review Notes)

```
- 로그인/계정이 필요 없습니다. 앱 실행 후 바로 모든 기능을 사용할 수 있습니다.
- 알람 기능은 로컬 알림 권한이 필요합니다(최초 실행 시 요청).
- 모든 데이터는 기기 내부에만 저장되며 서버로 전송되지 않습니다.
- 데모 계정: 불필요.
```

## 6. 제출 전 체크리스트

- [ ] `⚠️` iOS Bundle ID를 실제 ID로 변경(현재 RN 템플릿 기본값)
- [ ] `⚠️` 버전 정렬: package.json 0.0.1 → 스토어 1.0.0, 빌드 번호 세팅
- [ ] `⚠️` `NSLocationWhenInUseUsageDescription` 검토 — 위치 기능/라이브러리가 없으므로 **사용 안 하면 제거**(불필요한 권한 문구는 반려 사유). 실제로 쓰면 사용 목적 명시
- [ ] `⚠️` 미사용 의존성 정리 확인(`react-native-calendars` 등 커스텀 캘린더로 대체됨)
- [ ] 6.9" iPhone 스크린샷 세트 생성(현재 6.3"만 있음)
- [ ] 앱 아이콘 전 사이즈 / Android 피처 그래픽 준비
- [ ] Support URL / Privacy Policy URL 게시
- [ ] 알림 권한 요청 문구(용도) 확인
- [ ] Release 빌드에서 개발용 오버레이(디버거 경고 토스트) 미노출 확인
- [ ] 라이트/다크 양쪽 회귀 확인 (완료 — 스크린샷 참고)

---
_생성: 리뉴얼 후 배포 준비 단계. 스크린샷은 iPhone 16 Pro 시뮬레이터(iOS 18.2) 캡처._
