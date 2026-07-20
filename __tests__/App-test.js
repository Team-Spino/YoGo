/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';

it('renders correctly', async () => {
  // 앱의 마운트 이펙트(스플래시 숨김, 내비게이션·DB 초기화)가 테스트가 끝난
  // 뒤 비동기로 실행되면 Jest가 이미 정리된 환경을 건드립니다. act로 감싸
  // 이펙트를 먼저 흘려보냅니다.
  await act(async () => {
    renderer.create(<App />);
  });
});
