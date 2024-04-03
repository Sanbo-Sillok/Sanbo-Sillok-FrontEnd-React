export interface LoginBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  member: {
    id: number;
  };
  message: string;
  token: {
    access_token: string;
    refresh_token: string;
  };
}

export interface LogoutResponse {
  message: string;
}

export interface RefreshResponse {
  access: string;
}

export interface WikiPostBody {
  title: string;
  contents: string;
}

export interface WikiPatchBody {
  contents: string;
}
