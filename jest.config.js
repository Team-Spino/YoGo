// 시차를 다루는 코드가 많아, 테스트는 기기 타임존이 무엇이든 같은 결과를 내야 합니다.
//
// 서머타임이 있는 곳으로 맞춥니다. 서머타임이 없는 곳(UTC, 한국)으로 두면
// 하루를 86400초로 세는 식의 버그가 테스트를 그냥 통과해 버립니다.
process.env.TZ = 'America/New_York';

module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  // 기본 preset은 react-native/@react-native만 변환합니다. 앱 트리를 통째로
  // 마운트하는 스모크 테스트(App-test)를 위해, ESM으로 배포되는 커뮤니티
  // 패키지들도 변환 대상에 넣습니다.
  transformIgnorePatterns: [
    'node_modules/(?!(?:jest-)?react-native|@react-native|@react-navigation|react-native-.*|@gorhom|@op-engineering|@notifee)/',
  ],
};
