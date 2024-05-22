import { isServer } from './isServer';

describe('isServer', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('window 객체가 undefined인 경우 true', () => {
    vi.stubGlobal('window', undefined);
    expect(isServer()).toBe(true);
  });

  it('window 객체가 존재하는 경우 false', () => {
    expect(isServer()).toBe(false);
  });
});
