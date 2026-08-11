import dayjs from 'dayjs';

/**
 * `2024-01-15 09:00`을 `2024/01/15 09:00`으로 바꿉니다.
 *
 * 주의: Hermes의 Date 파서는 ISO-8601만 읽습니다. 슬래시든 하이픈이든
 * `new Date(<문자열>)`에 넘기면 Invalid Date가 나옵니다. 문자열을 Date로
 * 만들 때는 반드시 dayjs로 파싱하세요(dayjs는 구성요소로 읽어 안전합니다).
 * 이 함수는 dayjs가 이미 두 구분자를 모두 처리하므로 사실상 필요 없지만,
 * 하위 호환을 위해 남겨 둡니다.
 */
export const parseToSlash = (date: string) => date.replace(/-/g, '/');

/** 문자열이든 Date든 기기 시각 기준의 Date로 만듭니다. (Hermes-safe: dayjs 파싱) */
export const toLocalDate = (date: string | Date): Date =>
  date instanceof Date ? date : dayjs(date).toDate();
