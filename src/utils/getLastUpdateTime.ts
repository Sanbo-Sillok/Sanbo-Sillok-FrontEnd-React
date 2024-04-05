export function getLastUpdateTime(date: Date): string {
  const dateObject = new Date(date);

  const years = String(dateObject.getFullYear());
  const months = String(dateObject.getMonth() + 1).padStart(2, '0');
  const dates = String(dateObject.getDate()).padStart(2, '0');

  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  const seconds = String(dateObject.getSeconds()).padStart(2, '0');

  return `${years}-${months}-${dates} ${hours}:${minutes}:${seconds}`;
}
