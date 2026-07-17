module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  // tsconfig가 들고 있지 않은 파일은 타입 정보를 못 읽어 파서가 멈춥니다.
  ignorePatterns: [
    '.eslintrc.js',
    'babel.config.js',
    'jest.config.js',
    'metro.config.js',
    'server',
  ],
  plugins: ['@typescript-eslint', 'react-hooks'],
  env: {
    'react-native/react-native': true,
  },
  extends: [
    '@react-native',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // @react-native 설정이 prettier 규칙을 들고 오는데, 이 코드베이스는
    // 아직 prettier로 포맷한 적이 없습니다. 포맷팅은 따로 한 번에 잡습니다.
    'prettier/prettier': 'off',
    'no-console': 'off',
    // 의존성을 기계적으로 채우면 effect가 서로를 불러 루프가 납니다.
    // 하나씩 사람이 판단해야 해서 경고로 둡니다.
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      rules: {
        // 모듈 캐시를 비우고 다시 읽어야 하는 테스트가 있습니다.
        '@typescript-eslint/no-var-requires': 'off',
        // 아무 일도 하지 않는 것이 목적인 가짜 함수를 씁니다.
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
  ],
};
