import React from 'react';
import renderer, { act } from 'react-test-renderer';

const mockUnsubscribe = jest.fn();
const mockOnForegroundEvent = jest.fn((_cb?: unknown) => mockUnsubscribe);
const mockSetBadgeCount = jest.fn();
const mockGetBadgeCount = jest.fn();

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  // 팩토리는 아래 const들이 초기화되기 전에 실행되므로, 직접 참조하면
  // undefined가 잡힙니다. 호출 시점에 읽도록 래퍼로 감쌉니다.
  default: {
    onForegroundEvent: (cb: unknown) => mockOnForegroundEvent(cb),
    setBadgeCount: (count: unknown) => mockSetBadgeCount(count),
    getBadgeCount: () => mockGetBadgeCount(),
    requestPermission: jest.fn(),
    createTriggerNotification: jest.fn(),
    getTriggerNotifications: jest.fn(() => Promise.resolve([])),
    cancelTriggerNotification: jest.fn(),
  },
  AuthorizationStatus: { DENIED: 0, AUTHORIZED: 1, PROVISIONAL: 2 },
  EventType: { DELIVERED: 3 },
  RepeatFrequency: { WEEKLY: 3 },
  TriggerType: { TIMESTAMP: 0 },
}));

jest.mock('db', () => ({
  initAlarmPermissionTable: jest.fn(),
  findAlarmPermission: jest.fn(),
  addAlarmPermission: jest.fn(),
  editAlarmPermission: jest.fn(),
}));

import { useNotification } from '../useNotification';

type Notification = ReturnType<typeof useNotification>;

const renderUseNotification = () => {
  let result: Notification;

  const Probe = () => {
    result = useNotification();

    return null;
  };

  act(() => {
    renderer.create(<Probe />);
  });

  return result!;
};

describe('useNotification', () => {
  beforeEach(() => {
    mockUnsubscribe.mockReset();
    mockOnForegroundEvent.mockReset();
    mockOnForegroundEvent.mockReturnValue(mockUnsubscribe);
    mockSetBadgeCount.mockReset();
    mockGetBadgeCount.mockReset();
  });

  it('clears the badge and listens for delivered notifications', () => {
    const { handleNotificationBadge } = renderUseNotification();

    handleNotificationBadge();

    expect(mockSetBadgeCount).toHaveBeenCalledWith(0);
    expect(mockOnForegroundEvent).toHaveBeenCalledTimes(1);
  });

  it('returns the unsubscribe handle so the caller can clean up', () => {
    const { handleNotificationBadge } = renderUseNotification();

    const cleanup = handleNotificationBadge();

    expect(cleanup).toBe(mockUnsubscribe);
  });
});
