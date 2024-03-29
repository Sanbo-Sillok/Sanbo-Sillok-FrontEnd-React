export function getLastUpdateUser(username: string): string {
  if (username === 'admin') return username;

  return `${username.slice(0, 4)}****`;
}
