/// <reference path="../../lib.d.ts" />

type OPType = 'day' | 'month';

class DateUtilClass {
  date: Date;
  oneDayTime = 24 * 3600 * 1000;

  constructor(d?: AcceptableDate | null) {
    if (d == null) d = new Date();
    if (typeof d === 'number') d = new Date(d);
    if (typeof d === 'string') d = new Date(d.replace(/-/g, '/'));
    this.date = d;
  }

  to() {
    return this.date;
  }

  clone(ignoreDay?: boolean) {
    return this.toPure(ignoreDay);
  }

  toPure(ignoreDay?: boolean) {
    const d = this.date;
    if (ignoreDay) return new Date(d.getFullYear(), d.getMonth());
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  getFirstDayOfMonth() {
    return new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  }

  getLastDayOfMonth() {
    return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  }

  getFirstDayOfYear() {
    return new Date(this.date.getFullYear(), 0, 1);
  }

  getLastDayOfYear() {
    return new Date(this.date.getFullYear(), 12, 0);
  }

  getWeekNumber() {
    const pureDate = this.toPure();
    const firstDay = this.getFirstDayOfYear();
    const days = (pureDate.getTime() - firstDay.getTime()) / this.oneDayTime;
    return Math.ceil((days + firstDay.getDay() + 1) / 7);
  }

  equal(date: AcceptableDate | null) {
    if (date == null) return false;
    const _date = DateUtil(date).to();
    return (
      this.date.getFullYear() === _date.getFullYear() &&
      this.date.getMonth() === _date.getMonth() &&
      this.date.getDate() === _date.getDate()
    );
  }

  eq = this.equal;

  lessThan(date: AcceptableDate) {
    return this.toPure().getTime() < DateUtil.toPure(date).getTime();
  }

  lt = this.lessThan;

  greaterThan(date: AcceptableDate) {
    return this.toPure().getTime() > DateUtil.toPure(date).getTime();
  }

  gt = this.greaterThan;

  lessThanOrEqual(date: AcceptableDate) {
    return this.equal(date) || this.lessThan(date);
  }

  lte = this.lessThanOrEqual;

  greaterThanOrEqual(date: AcceptableDate) {
    return this.equal(date) || this.greaterThan(date);
  }

  gte = this.greaterThanOrEqual;

  isPreviousMonth(month: number) {
    return this.date.getMonth() < month;
  }

  isNextMonth(month: number) {
    return this.date.getMonth() > month;
  }

  isCurrentMonth(month: number) {
    return this.date.getMonth() === month;
  }

  isPreviousYear(year: number) {
    return this.date.getFullYear() < year;
  }

  isNextYear(year: number) {
    return this.date.getFullYear() > year;
  }

  isCurrentYear(year: number) {
    return this.date.getFullYear() === year;
  }

  addDays(days: number) {
    const d = this.date;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
  }

  subtractDays(days: number) {
    const d = this.date;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - days);
  }

  addMonths(months: number) {
    const d = this.date;
    return new Date(d.getFullYear(), d.getMonth() + months, d.getDate());
  }

  subtractMonths(months: number) {
    const d = this.date;
    return new Date(d.getFullYear(), d.getMonth() - months, d.getDate());
  }

  diffDays(date: AcceptableDate) {
    const pd1 = this.toPure();
    const pd2 = DateUtil(date).toPure();
    return Math.ceil((pd2.getTime() - pd1.getTime()) / this.oneDayTime);
  }

  diffMonths(date: AcceptableDate) {
    const _date = DateUtil(date).to();
    const y1 = this.date.getFullYear();
    const m1 = this.date.getMonth();
    const y2 = _date.getFullYear();
    const m2 = _date.getMonth();
    if (y1 === y2) return m2 - m1;
    if (y1 < y2) return (y2 - y1) * 12 + m2 - m1;
    return m2 - ((y1 - y2) * 12 + m1);
  }

  add(n: number, type: OPType = 'day') {
    if (type === 'day') return this.addDays(n);
    return this.addMonths(n);
  }

  subtract(n: number, type: OPType = 'day') {
    if (type === 'day') return this.subtractDays(n);
    return this.subtractMonths(n);
  }

  diff(date: AcceptableDate, type: OPType = 'day') {
    if (type === 'day') return this.diffDays(date);
    return this.diffMonths(date);
  }

  getDecade() {
    const start = ~~(this.date.getFullYear() / 10) * 10;
    return [start, start + 9];
  }

  getCentury() {
    const start = ~~(this.date.getFullYear() / 100) * 100;
    return [start, start + 99];
  }

  ofDecade(decade: number) {
    const year = this.date.getFullYear();
    return year >= decade && year <= decade + 9;
  }

  ofCentury(century: number) {
    const year = this.date.getFullYear();
    return year >= century && year <= century + 99;
  }

  /**
   * @param {string} [fmt='yyyy-MM-dd'] y-year, M-month, d-day, h-hour, m-minute, s-second, S-millisecond, q-quarter
   * @returns {string}
   * @memberof DateUtil
   */
  format(fmt = 'yyyy-MM-dd') {
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

export default function DateUtil(d?: AcceptableDate | null) {
  return new DateUtilClass(d);
}

DateUtil.sort = function sort(a: AcceptableDate, b: AcceptableDate) {
  const _a = DateUtil(a);
  if (_a.equal(b)) return 0;
  return _a.lessThan(b) ? -1 : 1;
};

DateUtil.eq = function eq(a: AcceptableDate | null, b: AcceptableDate | null) {
  if (a == null || b == null) return a === b;
  return DateUtil(a).equal(b);
};

DateUtil.lt = function lt(a: AcceptableDate | null, b: AcceptableDate | null) {
  if (a == null || b == null) return a === b;
  return DateUtil(a).lt(b);
};

DateUtil.gt = function gt(a: AcceptableDate | null, b: AcceptableDate | null) {
  if (a == null || b == null) return a === b;
  return DateUtil(a).gt(b);
};

DateUtil.lte = function lte(
  a: AcceptableDate | null,
  b: AcceptableDate | null
) {
  if (a == null || b == null) return a === b;
  return DateUtil(a).lte(b);
};

DateUtil.gte = function gte(
  a: AcceptableDate | null,
  b: AcceptableDate | null
) {
  if (a == null || b == null) return a === b;
  return DateUtil(a).gte(b);
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
