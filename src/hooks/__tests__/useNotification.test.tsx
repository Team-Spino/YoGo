import React from 'react';
import renderer, { act } from 'react-test-renderer';

const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

jest.mock('@react-native-community/push-notification-ios', () => ({
  __esModule: true,
  default: {
    addEventListener: (...args: Array<unknown>) => mockAddEventListener(...args),
    removeEventListener: (...args: Array<unknown>) =>
      mockRemoveEventListener(...args),
    setApplicationIconBadgeNumber: jest.fn(),
    removePendingNotificationRequests: jest.fn(),
    requestPermissions: jest.fn(),
    checkPermissions: jest.fn(),
  },
}));

jest.mock('react-native-push-notification', () => ({
  __esModule: true,
  default: {
    localNotificationSchedule: jest.fn(),
    getScheduledLocalNotifications: jest.fn(),
    getApplicationIconBadgeNumber: jest.fn(),
  },
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
    mockAddEventListener.mockReset();
    mockRemoveEventListener.mockReset();
  });

  it('listens for notifications so it can lower the badge', () => {
    const { handleNotificationBadge } = renderUseNotification();

    handleNotificationBadge();

    const listenedTo = mockAddEventListener.mock.calls.map(([type]) => type);

    expect(listenedTo).toEqual(['notification', 'localNotification']);
  });

  it('stops listening when the caller cleans up', () => {
    const { handleNotificationBadge } = renderUseNotification();

    const cleanup = handleNotificationBadge();

    expect(typeof cleanup).toBe('function');

    cleanup();

    const stoppedListeningTo = mockRemoveEventListener.mock.calls.map(
      ([type]) => type,
    );

    expect(stoppedListeningTo).toEqual(['notification', 'localNotification']);
  });
});
