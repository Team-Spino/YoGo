import { createChangeStore } from 'stores/changeStore';

export { createChangeStore } from 'stores/changeStore';
export type { ChangeStore } from 'stores/changeStore';

/** 일정이 저장·수정·삭제되면 여기서 알립니다. */
export const scheduleStore = createChangeStore();
