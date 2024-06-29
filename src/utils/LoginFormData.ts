export const LOGIN_FORM_KEY = {
  USERNAME: 'username',
  PASSWORD: 'password',
} as const;

export interface LoginFormData extends FormData {
  get(name: (typeof LOGIN_FORM_KEY)[keyof typeof LOGIN_FORM_KEY]): string;
}
