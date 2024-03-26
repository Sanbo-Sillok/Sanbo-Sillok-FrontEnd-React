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

export interface RefreshResponse {
  access: string;
}
