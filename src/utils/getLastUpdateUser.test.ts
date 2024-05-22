import { getLastUpdateUser } from './getLastUpdateUser';

describe('getLastUpdateUser', () => {
  it('이름이 첫 4글자만 출력되고 뒷 부분이 ****로 대체된다.', () => {
    expect(getLastUpdateUser('username1234')).toBe('user****');
  });

  it('사용자 이름이 admin인 경우 마스킹되지 않는다.', () => {
    expect(getLastUpdateUser('admin')).toBe('admin');
  });
});
