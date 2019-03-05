/**
 *
 * @param  {string} [fmt=yyyy-MM-dd]  y-year, M-month, d-day, h-hour, m-minute, s-second, S-millisecond, q-quarter
 * @param  {Date | number} [date]
 * @return {string}
 */
export default function(fmt = 'yyyy-MM-dd', date?: Date | number) {
  const realDate = date ? new Date(date) : new Date();
  const o: Record<string, number> = {
    'M+': realDate.getMonth() + 1,
    'd+': realDate.getDate(),
    'h+': realDate.getHours(),
    'm+': realDate.getMinutes(),
    's+': realDate.getSeconds(),
    'q+': Math.floor((realDate.getMonth() + 3) / 3),
    S: realDate.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    const y = (realDate.getFullYear() + '').substr(4 - RegExp.$1.length);
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
