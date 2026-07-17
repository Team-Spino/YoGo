/**
 * `2024-01-15 09:00`을 `2024/01/15 09:00`으로 바꿉니다.
 *
 * `new Date('2024-01-15')`는 UTC로 읽지만 슬래시를 쓰면 기기 시각으로 읽습니다.
 *
 * 문자열만 받습니다. Date를 넘기면 `String(date)`가 `GMT-0500` 같은 오프셋을
 * 함께 내놓고, 거기 있는 `-`까지 `/`로 바뀌어 오프셋이 깨집니다.
 * 이미 Date라면 이 함수가 필요 없으니 `toLocalDate`를 쓰세요.
 */
export const parseToSlash = (date: string) => date.replace(/-/g, '/');

/** 문자열이든 Date든 기기 시각 기준의 Date로 만듭니다. */
export const toLocalDate = (date: string | Date) =>
  date instanceof Date ? date : new Date(parseToSlash(date));
