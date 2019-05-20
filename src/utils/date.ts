import { alias } from '../decorators/alias';

const ONE_DAY_TIME = 24 * 3600 * 1000;

export type AcceptableDate = Date | number | string;

declare interface DateUtilClass {
  eq(date: AcceptableDate | null): boolean;
  lt(date: AcceptableDate): boolean;
  gt(date: AcceptableDate): boolean;
  lte(date: AcceptableDate): boolean;
  gte(date: AcceptableDate): boolean;
}

export default function DateUtil(d?: AcceptableDate | null) {
  // eslint-disable-next-line
  return new DateUtilClass(d);
}

DateUtil.sort = function sort(a: AcceptableDate, b: AcceptableDate) {
  const _a = DateUtil(a);
  if (_a.equal(b)) return 0;
  return _a.lessThan(b) ? -1 : 1;
};

DateUtil.eq = function equal(
  a: AcceptableDate | null,
  b: AcceptableDate | null
) {
  if (a == null || b == null) return a === b;
  return DateUtil(a).equal(b);
};

DateUtil.lt = function lessThan(
  a: AcceptableDate | null,
  b: AcceptableDate | null
) {
  if (a == null || b == null) return a === b;
  return DateUtil(a).lessThan(b);
};

DateUtil.gt = function greaterThan(
  a: AcceptableDate | null,
  b: AcceptableDate | null
) {
  if (a == null || b == null) return a === b;
  return DateUtil(a).greaterThan(b);
};

DateUtil.lte = function lessThanOrEqual(
  a: AcceptableDate | null,
  b: AcceptableDate | null
) {
  if (a == null || b == null) return a === b;
  return DateUtil(a).lessThanOrEqual(b);
};

DateUtil.gte = function greaterThanOrEqual(
  a: AcceptableDate | null,
  b: AcceptableDate | null
) {
  if (a == null || b == null) return a === b;
  return DateUtil(a).greaterThanOrEqual(b);
};

DateUtil.to = function to(date: AcceptableDate) {
  return DateUtil(date).to();
};

DateUtil.clone = function clone(date: AcceptableDate, ignoreDay?: boolean) {
  return DateUtil(date).clone(ignoreDay);
};

DateUtil.toPure = function toPure(date: AcceptableDate, ignoreDay?: boolean) {
  return DateUtil(date).toPure(ignoreDay);
};

DateUtil.getDecade = function getDecade(year: number) {
  return DateUtil(new Date(year, 0)).getDecade();
};

DateUtil.getCentury = function getCentury(year: number) {
  return DateUtil(new Date(year, 0)).getCentury();
};

DateUtil.format = function format(date: AcceptableDate, fmt?: string) {
  return DateUtil(date).format(fmt);
};

DateUtil.from = function from(year?: number, month?: number, day?: number) {
  if (arguments.length === 0) return DateUtil();
  const date = new Date(year || 0, month || 0, day || 1);
  return DateUtil(date);
};

class DateUtilClass {
  private date: Date;

  public constructor(d?: AcceptableDate | null) {
    if (d == null) d = new Date();
    if (typeof d === 'number') d = new Date(d);
    if (typeof d === 'string') d = new Date(d.replace(/-/g, '/'));
    this.date = d;
  }

  public to() {
    return this.date;
  }

  public clone(ignoreDay?: boolean) {
    return this.toPure(ignoreDay);
  }

  public toPure(ignoreDay?: boolean) {
    const d = this.date;
    if (ignoreDay) return new Date(d.getFullYear(), d.getMonth());
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  public getFirstDayOfMonth() {
    return new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  }

  public getLastDayOfMonth() {
    return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  }

  public getFirstDayOfYear() {
    return new Date(this.date.getFullYear(), 0, 1);
  }

  public getLastDayOfYear() {
    return new Date(this.date.getFullYear(), 12, 0);
  }

  public getWeekNumber() {
    const pureDate = this.toPure();
    const firstDay = this.getFirstDayOfYear();
    const days = (pureDate.getTime() - firstDay.getTime()) / ONE_DAY_TIME;
    return Math.ceil((days + firstDay.getDay() + 1) / 7);
  }

  @alias('eq')
  public equal(date: AcceptableDate | null) {
    if (date == null) return false;
    const _date = DateUtil(date).to();
    return (
      this.date.getFullYear() === _date.getFullYear() &&
      this.date.getMonth() === _date.getMonth() &&
      this.date.getDate() === _date.getDate()
    );
  }

  @alias('lt')
  public lessThan(date: AcceptableDate) {
    return this.toPure().getTime() < DateUtil.toPure(date).getTime();
  }

  @alias('gt')
  public greaterThan(date: AcceptableDate) {
    return this.toPure().getTime() > DateUtil.toPure(date).getTime();
  }

  @alias('lte')
  public lessThanOrEqual(date: AcceptableDate) {
    return this.equal(date) || this.lessThan(date);
  }

  @alias('gte')
  public greaterThanOrEqual(date: AcceptableDate) {
    return this.equal(date) || this.greaterThan(date);
  }

  public isPreviousMonth(month: number) {
    return this.date.getMonth() < month;
  }

  public isNextMonth(month: number) {
    return this.date.getMonth() > month;
  }

  public isCurrentMonth(month: number) {
    return this.date.getMonth() === month;
  }

  public isPreviousYear(year: number) {
    return this.date.getFullYear() < year;
  }

  public isNextYear(year: number) {
    return this.date.getFullYear() > year;
  }

  public isCurrentYear(year: number) {
    return this.date.getFullYear() === year;
  }

  public addDays(days: number) {
    const d = this.date;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
  }

  public subtractDays(days: number) {
    const d = this.date;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - days);
  }

  public addMonths(months: number) {
    const d = this.date;
    return new Date(d.getFullYear(), d.getMonth() + months, d.getDate());
  }

  public subtractMonths(months: number) {
    const d = this.date;
    return new Date(d.getFullYear(), d.getMonth() - months, d.getDate());
  }

  public diffDays(date: AcceptableDate) {
    const pd1 = this.toPure();
    const pd2 = DateUtil(date).toPure();
    return Math.ceil((pd2.getTime() - pd1.getTime()) / ONE_DAY_TIME);
  }

  public diffMonths(date: AcceptableDate) {
    const _date = DateUtil(date).to();
    const y1 = this.date.getFullYear();
    const m1 = this.date.getMonth();
    const y2 = _date.getFullYear();
    const m2 = _date.getMonth();
    if (y1 === y2) return m2 - m1;
    if (y1 < y2) return (y2 - y1) * 12 + m2 - m1;
    return m2 - ((y1 - y2) * 12 + m1);
  }

  public add(n: number, type: 'day' | 'month' = 'day') {
    if (type === 'day') return this.addDays(n);
    return this.addMonths(n);
  }

  public subtract(n: number, type: 'day' | 'month' = 'day') {
    if (type === 'day') return this.subtractDays(n);
    return this.subtractMonths(n);
  }

  public diff(date: AcceptableDate, type: 'day' | 'month' = 'day') {
    if (type === 'day') return this.diffDays(date);
    return this.diffMonths(date);
  }

  public getDecade() {
    const start = ~~(this.date.getFullYear() / 10) * 10;
    return [start, start + 9];
  }

  public getCentury() {
    const start = ~~(this.date.getFullYear() / 100) * 100;
    return [start, start + 99];
  }

  public ofDecade(decade: number) {
    const year = this.date.getFullYear();
    return year >= decade && year <= decade + 9;
  }

  public ofCentury(century: number) {
    const year = this.date.getFullYear();
    return year >= century && year <= century + 99;
  }

  /**
   * @param {string} [fmt='yyyy-MM-dd'] y-year, M-month, d-day, h-hour, m-minute, s-second, S-millisecond, q-quarter
   * @returns {string}
   * @memberof DateUtil
   */
  public format(fmt = 'yyyy-MM-dd') {
    const o: Record<string, number> = {
      'M+': this.date.getMonth() + 1,
      'd+': this.date.getDate(),
      'h+': this.date.getHours(),
      'm+': this.date.getMinutes(),
      's+': this.date.getSeconds(),
      'q+': Math.floor((this.date.getMonth() + 3) / 3),
      S: this.date.getMilliseconds(),
      w: this.getWeekNumber(),
    };
    if (/(y+)/.test(fmt)) {
      const y = (this.date.getFullYear() + '').substr(4 - RegExp.$1.length);
      fmt = fmt.replace(RegExp.$1, y);
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        const one = RegExp.$1.length === 1;
        const d = one ? o[k] : ('00' + o[k]).substr(('' + o[k]).length);
        fmt = fmt.replace(RegExp.$1, '' + d);
      }
    }
    return fmt;
  }
}
