import { canonicalZone } from '../timeZone';
import { ZONE_ALIASES } from '../zoneAliases';

describe('canonicalZone', () => {
  it('leaves a canonical zone as it is', () => {
    expect(canonicalZone('Asia/Seoul')).toBe('Asia/Seoul');
  });

  it('turns an old name into its current name', () => {
    expect(canonicalZone('Asia/Kolkata')).toBe('Asia/Calcutta');
  });

  it('turns a country alias into a city zone', () => {
    expect(canonicalZone('Japan')).toBe('Asia/Tokyo');
    expect(canonicalZone('US/Pacific')).toBe('America/Los_Angeles');
  });

  it('resolves a two-hop alias all the way to its final name', () => {
    // America/Rosario -> (옛 V8) America/Cordoba 는 그 자체도 별칭입니다.
    expect(canonicalZone('America/Rosario')).toBe('America/Argentina/Cordoba');
  });

  it('leaves an unknown zone untouched', () => {
    expect(canonicalZone('Not/AZone')).toBe('Not/AZone');
  });

  it('maps every alias to a name that is not itself an alias', () => {
    Object.values(ZONE_ALIASES).forEach(target => {
      expect(ZONE_ALIASES[target]).toBeUndefined();
    });
  });
});
