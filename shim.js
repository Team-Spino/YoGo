/**
 * styled-components v5 브라우저 오판 방지 shim.
 *
 * styled-components v5는 `typeof window !== 'undefined' && 'HTMLElement' in window`
 * 로 브라우저 여부를 판별합니다. RN 0.86(bridgeless)이 전역 `HTMLElement`를
 * 노출하면서, 네이티브인데도 브라우저로 오인해 마운트 시 DOM 리하이드레이션
 * (`document.querySelectorAll`)을 돌리다 `Property 'document' doesn't exist`로
 * 죽습니다. styled-components가 로드되기 전에 이 전역을 지워 오판을 막습니다.
 *
 * Phase 3에서 styled-components를 Tamagui로 걷어내면 이 shim도 사라집니다.
 */
const g = globalThis;

if (typeof g !== 'undefined' && typeof g.document === 'undefined') {
  if ('HTMLElement' in g) {
    try {
      delete g.HTMLElement;
    } catch (e) {
      // 지울 수 없으면, 리하이드레이션이 조용히 지나가도록 빈 document를 둡니다.
      g.document = { querySelectorAll: () => [] };
    }
  }
}
