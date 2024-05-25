export interface LoginBody {
  username: string;
  password: string;
}

/**
 * 1. ADMIN (관리자)
 * 2. ACTIVE (승인 후)
 * 3. GUEST (read only)
 * 4. INACTIVE (승인 전)
 */
export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  ACTIVE = 'ROLE_ACTIVE',
  GUEST = 'ROLE_GUEST',
  INACTIVE = 'ROLE_INACTIVE',
}

export interface LoginResponse {
  accessToken: string;
  // refresh_token: string;
  role: UserRole;
}

export interface LogoutResponse {}

export interface RefreshResponse {
  access: string;
}

export interface SignupBody {
  username: string;
  password: string;
  studentIdImage: File;
}

export interface SignupResponse {
  member: {
    username: string;
    password: string;
  };
  message: string;
  token: {
    access_token: string;
    refresh_token: string;
  };
}

export interface CheckUsernameResponse {
  isExist: boolean;
}

export interface PendingUserDataResponse {
  username: string;
  createdAt: Date;
  studentIdImagePath: string;
}
