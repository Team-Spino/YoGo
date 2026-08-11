type Listener = () => void;

export interface ChangeStore {
  subscribe: (listener: Listener) => () => void;
  emitChanged: () => void;
}

/**
 * 아주 작은 변경 알림 스토어입니다.
 *
 * 데이터가 바뀌었다는 신호만 흘려보냅니다. 데이터 자체는 담지 않습니다.
 * 데이터 훅이 여기 구독해, 다른 화면에서 저장·삭제가 일어나면 다시
 * 조회하도록 씁니다. 전역 불린으로 새로고침을 흉내 내던 PopContext를
 * 대신합니다.
 */
export const createChangeStore = (): ChangeStore => {
  const listeners = new Set<Listener>();

  return {
    subscribe(listener) {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
    emitChanged() {
      listeners.forEach(listener => listener());
    },
  };
};
