export interface LoginBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  // refresh_token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface RefreshResponse {
  access: string;
}

export interface SignupBody {
  username: string;
  password: string;
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

export interface PendingUserList {
  username: string;
  createdAt: Date;
  studentIdImagePath: string;
}
