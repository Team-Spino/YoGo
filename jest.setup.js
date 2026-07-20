/* eslint-env jest */

// react-native-mmkv v4는 Nitro 기반이라 순수 ESM/네이티브 모듈을 내보냅니다.
// 테스트에서는 메모리 맵으로 대체해, 저장/조회 동작만 흉내 냅니다.
jest.mock('react-native-mmkv', () => {
  const store = new Map();
  const instance = {
    set: (key, value) => store.set(key, value),
    getString: key => store.get(key),
    getNumber: key => store.get(key),
    getBoolean: key => store.get(key),
    contains: key => store.has(key),
    delete: key => store.delete(key),
    clearAll: () => store.clear(),
    getAllKeys: () => Array.from(store.keys()),
  };

  return {
    createMMKV: () => instance,
    MMKV: function MMKV() {
      return instance;
    },
  };
});

// react-native-bootsplash는 네이티브 TurboModule(RNBootSplash)을 요구합니다.
jest.mock('react-native-bootsplash', () => ({
  __esModule: true,
  default: {
    hide: jest.fn(() => Promise.resolve()),
    show: jest.fn(() => Promise.resolve()),
    isVisible: jest.fn(() => Promise.resolve(false)),
  },
}));

// @op-engineering/op-sqlite는 JSI 네이티브 바인딩입니다. 앱을 통째로 마운트할
// 때 커넥션이 열려도 아무 일도 하지 않도록 빈 결과를 돌려줍니다.
jest.mock('@op-engineering/op-sqlite', () => ({
  open: jest.fn(() => ({
    execute: jest.fn(() =>
      Promise.resolve({ rows: [], rowsAffected: 0, insertId: undefined }),
    ),
  })),
}));

// @notifee/react-native는 공식 jest 목을 제공합니다.
jest.mock('@notifee/react-native', () =>
  require('@notifee/react-native/jest-mock'),
);

// Reanimated 4와 gesture-handler의 표준 테스트 설정.
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
require('react-native-gesture-handler/jestSetup');
