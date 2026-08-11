import { to12Hour } from 'utils/timeZone';

/**
 * `HH:mm` 시각을 `9:05 AM` 꼴로 바꿉니다.
 *
 * 문자열을 다시 Date로 되돌리지 않습니다. 예전 구현은
 * `new Date(parseToSlash(...))`를 썼는데, Hermes의 Date 파서는 ISO만 읽어서
 * 실기기에서는 Invalid Date가 됐습니다. Node(V8)는 관대해서 테스트로는
 * 드러나지 않던 문제입니다.
 *
 * day는 시각을 읽는 데 쓰이지 않지만, 호출부 형태를 유지하려고 남겨둡니다.
 */
export const toFormat12Hour = ({
  day,
  time,
}: {
  day: string;
  time: string;
}) => {
  const { time: label, meridiem } = to12Hour(`${day} ${time}`);

  return `${label} ${meridiem}`;
};
