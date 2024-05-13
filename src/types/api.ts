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
  content: string;
}

export interface WikiPatchBody {
  content: string;
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

export interface ImageUploadResponse {
  status: number;
  message: string;
  result: {
    id: number;
    image: string;
  };
}
