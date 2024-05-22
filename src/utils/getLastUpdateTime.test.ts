import { getLastUpdateTime } from './getLastUpdateTime';

describe('getLastUpdateTime', () => {
  it('Date 형식을 YYYY-MM-DD HH:MM:SS 형식으로 바꿀 수 있다.', () => {
    const date = new Date('2000-01-01T00:00:00');

    expect(getLastUpdateTime(date)).toBe('2000-01-01 00:00:00');
  });
});
