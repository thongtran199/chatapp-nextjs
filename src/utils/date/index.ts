import originalDayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

originalDayjs.extend(LocalizedFormat);
originalDayjs.extend(utc);
originalDayjs.extend(isSameOrBefore);

export const DayMonthYearFormat = 'DD/MM/YYYY';
export const MonthDayYearFormat = 'MM/DD/YYYY';
export const MonthDayYearTimeFormat = 'MMM DD, YYYY HH:mm:ss';

export const DatetimeFormat = 'HH:mm MMM DD';

originalDayjs.locale();

export function formatDate(
  date: string,
  format: string = MonthDayYearFormat,
): string {
  const parsedDate = originalDayjs.utc(date).local();
  return parsedDate.format(format);
}

export function getDaysDiff(start: string, end: string): number {
  const startDate = originalDayjs(start);
  const endDate = originalDayjs(end);
  return endDate.diff(startDate, 'day');
}

export function getToday(): string {
  return originalDayjs.utc().toString();
}

export function isFutureDate(date: string): boolean {
  const parsedDate = originalDayjs(date);
  return parsedDate.isAfter(originalDayjs(), 'day');
}

export function isPastDate(date: string): boolean {
  const parsedDate = originalDayjs(date);
  return parsedDate.isBefore(originalDayjs(), 'day');
}

export function isValidDate(date: string): boolean {
  const parsedDate = originalDayjs(date);
  return parsedDate.isValid();
}

export function checkCurDateAfterPrevDate(
  curDate: originalDayjs.Dayjs,
  prevDates: (originalDayjs.Dayjs | null)[],
) {
  for (const prevDate of prevDates) {
    if (prevDate && curDate.isBefore(originalDayjs(prevDate))) {
      return false;
    }
  }
  return true;
}

export function checkCurDateBeforeNextDate(
  curDate?: string,
  nextDate?: string,
) {
  if (!curDate || !nextDate) {
    return true;
  }
  return originalDayjs(curDate).isBefore(originalDayjs(nextDate));
}

export function dayjs(
  date?: originalDayjs.ConfigType,
  format?: originalDayjs.OptionType,
  locale?: string,
  strict?: boolean,
): originalDayjs.Dayjs {
  const res = originalDayjs(date, format, locale, strict).utc(true);
  return res;
}
