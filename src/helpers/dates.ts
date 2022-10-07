export function formatISO(date: number) {
  const dateTime = new Date(date);
  dateTime.toISOString();
  return dateTime.toISOString();
}

export function subDays(date: number, days: number) {
  const dateTime = new Date(date);
  dateTime.setDate(dateTime.getDate() - days);
  return dateTime.valueOf();
}
