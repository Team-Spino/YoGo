import {
  getCityFromZone,
  getOffsetMinutes,
  getRelativeDay,
  getTimeDifference,
} from '../timeZone';

describe('getOffsetMinutes', () => {
  it('returns the whole-hour offset in minutes', () => {
    expect(
      getOffsetMinutes({
        targetZone: 'Asia/Seoul',
        baseZone: 'UTC',
        at: '2024-01-15T00:00:00Z',
      }),
    ).toBe(540);
  });

  it('keeps the minute part for half-hour zones', () => {
    expect(
      getOffsetMinutes({
        targetZone: 'Asia/Kolkata',
        baseZone: 'UTC',
        at: '2024-01-15T00:00:00Z',
      }),
    ).toBe(330);
  });

  it('returns a negative number for zones behind the base zone', () => {
    expect(
      getOffsetMinutes({
        targetZone: 'America/New_York',
        baseZone: 'UTC',
        at: '2024-01-15T00:00:00Z',
      }),
    ).toBe(-300);
  });

  it('returns zero when both zones share an offset', () => {
    expect(
      getOffsetMinutes({
        targetZone: 'Asia/Seoul',
        baseZone: 'Asia/Tokyo',
        at: '2024-01-15T00:00:00Z',
      }),
    ).toBe(0);
  });
});

describe('getTimeDifference', () => {
  it('returns a whole-hour offset for zones that sit on the hour', () => {
    expect(
      getTimeDifference({
        targetZone: 'Asia/Seoul',
        baseZone: 'UTC',
        at: '2024-01-15T00:00:00Z',
      }),
    ).toBe('+9');
  });

  it('keeps the 30 minute part for half-hour zones', () => {
    expect(
      getTimeDifference({
        targetZone: 'Asia/Kolkata',
        baseZone: 'UTC',
        at: '2024-01-15T00:00:00Z',
      }),
    ).toBe('+5:30');
  });

  it('keeps the 45 minute part for quarter-hour zones', () => {
    expect(
      getTimeDifference({
        targetZone: 'Asia/Kathmandu',
        baseZone: 'UTC',
        at: '2024-01-15T00:00:00Z',
      }),
    ).toBe('+5:45');
  });

  it('signs zones behind the base zone as negative', () => {
    expect(
      getTimeDifference({
        targetZone: 'America/New_York',
        baseZone: 'UTC',
        at: '2024-01-15T00:00:00Z',
      }),
    ).toBe('-5');
  });

  it('keeps the minute part for negative half-hour zones', () => {
    expect(
      getTimeDifference({
        targetZone: 'Pacific/Marquesas',
        baseZone: 'UTC',
        at: '2024-01-15T00:00:00Z',
      }),
    ).toBe('-9:30');
  });

  it('returns +0 when both zones share an offset', () => {
    expect(
      getTimeDifference({
        targetZone: 'Asia/Seoul',
        baseZone: 'Asia/Tokyo',
        at: '2024-01-15T00:00:00Z',
      }),
    ).toBe('+0');
  });

  it('follows daylight saving time in the target zone', () => {
    expect(
      getTimeDifference({
        targetZone: 'America/New_York',
        baseZone: 'UTC',
        at: '2024-07-15T00:00:00Z',
      }),
    ).toBe('-4');
  });
});

describe('getRelativeDay', () => {
  it('reports Today when both zones are on the same calendar date', () => {
    expect(
      getRelativeDay({
        targetZone: 'Asia/Seoul',
        baseZone: 'UTC',
        at: '2024-01-15T03:00:00Z',
      }),
    ).toBe('Today');
  });

  it('reports Tomorrow when the target zone has crossed into the next day', () => {
    expect(
      getRelativeDay({
        targetZone: 'Asia/Seoul',
        baseZone: 'UTC',
        at: '2024-01-15T20:00:00Z',
      }),
    ).toBe('Tomorrow');
  });

  it('reports Yesterday when the target zone is still on the previous day', () => {
    expect(
      getRelativeDay({
        targetZone: 'Pacific/Honolulu',
        baseZone: 'UTC',
        at: '2024-01-15T05:00:00Z',
      }),
    ).toBe('Yesterday');
  });

  it('reports Tomorrow across a month boundary', () => {
    expect(
      getRelativeDay({
        targetZone: 'Asia/Seoul',
        baseZone: 'UTC',
        at: '2024-07-31T20:00:00Z',
      }),
    ).toBe('Tomorrow');
  });

  it('reports Yesterday across a month boundary', () => {
    expect(
      getRelativeDay({
        targetZone: 'Pacific/Honolulu',
        baseZone: 'UTC',
        at: '2024-08-01T05:00:00Z',
      }),
    ).toBe('Yesterday');
  });

  it('reports Tomorrow across a year boundary', () => {
    expect(
      getRelativeDay({
        targetZone: 'Asia/Seoul',
        baseZone: 'UTC',
        at: '2024-12-31T20:00:00Z',
      }),
    ).toBe('Tomorrow');
  });
});

describe('getCityFromZone', () => {
  it('takes the city out of a region/city zone', () => {
    expect(getCityFromZone('Asia/Seoul')).toBe('Seoul');
  });

  it('turns underscores into spaces', () => {
    expect(getCityFromZone('America/New_York')).toBe('New York');
  });

  it('takes the city out of a three part zone', () => {
    expect(getCityFromZone('America/Argentina/Buenos_Aires')).toBe(
      'Buenos Aires',
    );
  });

  it('returns the zone itself when it has no region prefix', () => {
    expect(getCityFromZone('Japan')).toBe('Japan');
  });

  it('returns an empty string when the zone is missing', () => {
    expect(getCityFromZone(undefined)).toBe('');
  });
});
