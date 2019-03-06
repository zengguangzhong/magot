export function getSafeDate(d: Date | string | number) {
  if (typeof d === 'number') return new Date(d);
  if (typeof d === 'string') return new Date(d.replace(/-/g, '/'));
  return d;
}

export function getPureDate(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function getFirstDateOfMonth(year: number, month: number) {
  return new Date(year, month, 1);
}

export function getLastDateOfMonth(year: number, month: number) {
  return new Date(year, month + 1, 0);
}

export function isEqualDate(date1: Date | null, date2: Date | null) {
  if (date1 === null || date2 === null) {
    return date1 === date2;
  }
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function lessThanDate(date1: Date, date2: Date) {
  const d1 = getPureDate(date1);
  const d2 = getPureDate(date2);
  return d1.getTime() < d2.getTime();
}

export function greaterThanDate(date1: Date, date2: Date) {
  const d1 = getPureDate(date1);
  const d2 = getPureDate(date2);
  return d1.getTime() > d2.getTime();
}

export function isPreviousMonth(date: Date, month: number) {
  return date.getMonth() < month;
}

export function isNextMonth(date: Date, month: number) {
  return date.getMonth() > month;
}

export function isCurrentMonth(date: Date, month: number) {
  return date.getMonth() === month;
}

export function isPreviousYear(date: Date, year: number) {
  return date.getFullYear() < year;
}

export function isNextYear(date: Date, year: number) {
  return date.getFullYear() > year;
}

export function isCurrentYear(date: Date, year: number) {
  return date.getFullYear() === year;
}
