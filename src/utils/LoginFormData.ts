export interface LoginFormData extends FormData {
  get(name: 'username' | 'password'): string;
}
