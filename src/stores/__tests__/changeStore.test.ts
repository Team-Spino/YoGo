import { createChangeStore } from '../changeStore';

describe('createChangeStore', () => {
  it('calls a listener when something changes', () => {
    const store = createChangeStore();
    const listener = jest.fn();

    store.subscribe(listener);
    store.emitChanged();

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('calls every listener', () => {
    const store = createChangeStore();
    const a = jest.fn();
    const b = jest.fn();

    store.subscribe(a);
    store.subscribe(b);
    store.emitChanged();

    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledTimes(1);
  });

  it('stops calling a listener after it unsubscribes', () => {
    const store = createChangeStore();
    const listener = jest.fn();

    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.emitChanged();

    expect(listener).not.toHaveBeenCalled();
  });

  it('only removes the listener that unsubscribed', () => {
    const store = createChangeStore();
    const stays = jest.fn();
    const goes = jest.fn();

    store.subscribe(stays);
    const unsubscribe = store.subscribe(goes);
    unsubscribe();
    store.emitChanged();

    expect(stays).toHaveBeenCalledTimes(1);
    expect(goes).not.toHaveBeenCalled();
  });

  it('keeps counting changes across several emits', () => {
    const store = createChangeStore();
    const listener = jest.fn();

    store.subscribe(listener);
    store.emitChanged();
    store.emitChanged();

    expect(listener).toHaveBeenCalledTimes(2);
  });
});
