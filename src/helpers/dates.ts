export function formatISO(date: number) {
  /*Usage: formatISO(Date.now()) returns the current Time in UTC in ISO format*/
  const dateTime = new Date(date);
  dateTime.toISOString();
  return dateTime.toISOString();
}

export function subDays(date: number, days: number) {
  /*Usage: subDays(Date.now(), 7) returns the current Time in UTC 7 days before*/
  if (days < 0) {
    throw Error('Only positive whole numbers!');
  }
  const dateTime = new Date(date);
  dateTime.setDate(dateTime.getDate() - days);
  return dateTime.valueOf();
}
