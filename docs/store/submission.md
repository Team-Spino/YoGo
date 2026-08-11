# YOGO — 스토어 배포·심사 정보

> 리뉴얼(RN 0.86 New Arch + Tamagui 에디토리얼 디자인) 후 앱스토어/플레이스토어
> 제출에 필요한 메타데이터·스크린샷·심사 노트를 모아둔 문서입니다.
> `⚠️ TODO`가 붙은 항목은 제출 전 실제 값으로 채워야 합니다.

## 1. 앱 정보

| 항목 | 값 |
| --- | --- |
| 앱 이름 | YOGO (App Store: **YOGO - Time Zone Planner**) |
| 한 줄 소개 | 다른 도시 시간에 맞춰 알람을 잡는 타임존 스케줄러 |
| App Store | 기존 앱: **id `1626444795`** — https://apps.apple.com/kr/app/yogo-time-zone-planner/id1626444795 (판매자: sangwoo yang) |
| iOS Bundle ID | ✅ **`com.teamspino.yogo`** (릴리즈) / `com.teamspino.yogo.debug` (디버그) — iTunes lookup API로 확인한 **라이브 실제 값**. (git 이력의 `com.yogo`는 개발용이었고 실제 제출은 이 값) |
| iOS DEVELOPMENT_TEAM | ✅ **`2F856BC6C4`** — 같은 Apple 계정의 다른 앱(maeil-app, DailyReceipt 등) 전부 동일. 확정 |
| Android applicationId | `com.yogo` — **Play 미게시**이므로 신규 등록 시 현재 값 그대로 사용 가능(자유롭게 지정 가능) |
| 버전 (Marketing) | 라이브 **1.0.1** (2022-06-19). 다음 제출은 **1.0.2 이상**, `CURRENT_PROJECT_VERSION`(빌드번호)도 증가 |
| 최소 지원 | 스토어 등록값 iOS **12.0** / 현재 repo `IPHONEOS_DEPLOYMENT_TARGET 15.1` (`⚠️` 올릴지 유지할지 결정) / Android `⚠️ minSdk 확인` |
| 카테고리 | 라이브 등록 **Lifestyle** (원하면 Productivity로 변경 가능) |
| 지원 URL | **https://github.com/Team-Spino/YoGo/blob/develop/docs/SUPPORT.md** (스토어 `yogo.or.kr`은 미운영이라 교체) |
| 개인정보처리방침 URL | **https://github.com/Team-Spino/YoGo/blob/develop/docs/PRIVACY.md** |
| 연령 등급 | 4+ (수집·유해 콘텐츠 없음) |

## 2. 스크린샷 / 미리보기

`docs/store/screenshots/` (iPhone 16 Pro, 1206×2622 = 6.3" 디스플레이)

| 파일 | 화면 | 설명 |
| --- | --- | --- |
| `01-home.png` | 홈(일정) | 헤어라인 일정 리스트 + 커스텀 캘린더 스트립, 활성/비활성 알람 |
| `02-world-clock.png` | 월드클락 | 여러 도시의 현재 시각 비교 |
| `03-add-schedule.png` | 일정 생성 | 제목·색 태그·목적지 타임존·날짜 선택 |
| `04-home-dark.png` | 홈(다크) | 시스템 연동 다크 테마 |

`screenshots-6.9/` (iPhone 16 Pro Max, **1320×2868 = 6.9"**) — 동일 4화면

### 필요한 스크린샷 규격
- **iOS**
  - ✅ 6.9" (iPhone 16 Pro Max, 1320×2868) — **필수** · `screenshots-6.9/`
  - ✅ 6.3" (iPhone 16 Pro, 1206×2622) — `screenshots/`
  - 6.5" (1284×2778 또는 1242×2688) — 권장(6.9"로 대체 표시 가능)
  - iPad 12.9" (2048×2732) — `⚠️ TODO` iPad 지원 시에만
- **Android (Play)**: `⚠️ TODO` 폰 스크린샷 최소 2장(1080×1920 이상), 512×512 아이콘, 1024×500 피처 그래픽

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

- **지원 URL**: https://github.com/Team-Spino/YoGo/blob/develop/docs/SUPPORT.md
- **개인정보처리방침 URL**: https://github.com/Team-Spino/YoGo/blob/develop/docs/PRIVACY.md
- (스토어 판매자 URL `yogo.or.kr`은 미운영 → 위 GitHub 페이지로 교체. `develop`에 머지되면 URL이 활성화됩니다.)

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

- [x] ✅ iOS Bundle ID 설정 완료 — **`com.teamspino.yogo`**(릴리즈)/`com.teamspino.yogo.debug`(디버그) = 라이브 앱 실제 값(iTunes API 확인). DEVELOPMENT_TEAM `2F856BC6C4` (팀 유효성만 Xcode에서 확인)
- [ ] `⚠️` **버전 bump**: 라이브 1.0.1 → `MARKETING_VERSION` 1.0.2 이상, `CURRENT_PROJECT_VERSION`(빌드번호) 증가
- [x] ✅ `NSLocationWhenInUseUsageDescription` 제거 완료 — 위치 기능/라이브러리 없음(iOS/Android 모두 위치 권한 없음)
- [ ] `⚠️` 미사용 의존성 정리 확인(`react-native-calendars` 등 커스텀 캘린더로 대체됨)
- [x] ✅ 6.9" iPhone 스크린샷 세트 생성 완료(`screenshots-6.9/`, 1320×2868)
- [ ] 앱 아이콘 전 사이즈 / Android 피처 그래픽 준비
- [x] ✅ Support/Privacy 페이지 작성 완료 — `docs/SUPPORT.md`·`docs/PRIVACY.md`. App Store Connect에 GitHub blob URL 등록(`develop` 머지 후 활성)
- [ ] 알림 권한 요청 문구(용도) 확인
- [ ] Release 빌드에서 개발용 오버레이(디버거 경고 토스트) 미노출 확인
- [ ] 라이트/다크 양쪽 회귀 확인 (완료 — 스크린샷 참고)

## 7. 빌드·업로드 (EAS)

다른 프로젝트(maeil·dailyreceipt)와 동일하게 **EAS**로 빌드/제출합니다. YOGO는
bare RN(Expo 아님)이지만 EAS Build/Submit은 bare RN도 지원합니다. 설정은
루트 `eas.json`에 있습니다(submit: `appleTeamId 2F856BC6C4`, `ascAppId 1626444795`).

```bash
# 최초 1회: Expo 계정 로그인 (다른 프로젝트와 동일 계정)
npx eas-cli@latest login

# iOS 프로덕션 클라우드 빌드 (서명은 EAS가 Apple 계정으로 관리)
npx eas-cli@latest build --platform ios --profile production

# App Store Connect 업로드 (기존 앱 id 1626444795로 올라감)
npx eas-cli@latest submit --platform ios --profile production
```

- `appVersionSource: "local"` — 네이티브에 설정한 **2.0.0**을 사용, `autoIncrement`가
  빌드번호를 올립니다.
- 첫 빌드 시 `eas`가 iOS 자격증명(인증서/프로비저닝)을 Apple 계정에서 자동
  생성/관리할지 물어봅니다(대부분 자동으로 두면 됩니다).
- `⚠️` 클라우드 빌드는 EAS 로그인·Apple 로그인이 필요해 로컬에서 자동 실행 불가 —
  위 명령을 직접 실행하세요. (로컬 아카이브를 원하면 `eas build --local` 또는 Xcode
  Archive 후 `eas submit --path <ipa>`도 가능.)

---
_생성: 리뉴얼 후 배포 준비 단계. 스크린샷은 iPhone 16 Pro / Pro Max 시뮬레이터(iOS 18.2) 캡처._
