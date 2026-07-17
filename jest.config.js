// 시차를 다루는 코드가 많아, 테스트는 기기 타임존이 무엇이든 같은 결과를 내야 합니다.
//
// 서머타임이 있는 곳으로 맞춥니다. 서머타임이 없는 곳(UTC, 한국)으로 두면
// 하루를 86400초로 세는 식의 버그가 테스트를 그냥 통과해 버립니다.
process.env.TZ = 'America/New_York';

module.exports = {
  preset: 'react-native',
};
