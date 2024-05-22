export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

// FIXME: 추후 제거
export const ACCESS_TOKEN_LOCAL_STORAGE_EXPIRE = 1000 * 60 * 60; // 1시간

/**
 * 패스워드 정규식
 * - 8자리 이상
 * - 대문자
 * - 소문자
 * - 숫자
 * - 특수문자
 */
export const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
