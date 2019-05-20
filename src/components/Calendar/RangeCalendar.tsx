import React from 'react';
import Calendar, { CalendarNormalProps } from './Calendar';
import { getComponentClasses } from '../component';
import DateUtil, { AcceptableDate } from '../../utils/date';

export interface RangeCalendarProps extends CalendarNormalProps {
  /**
   * 当前选中的日期范围
   */
  value?: AcceptableDate[] | null;

  /**
   * 当前选中值发生变化后的回调函数
   */
  onChange?: (dates: Date[]) => void;
}

function RangeCalendar(props: RangeCalendarProps) {
  const {
    className,
    style,
    children,
    value,
    onChange,
    ...calendarProps
  } = props;

  const valueProp = (value || []).slice(0, 2);
  const datesProp = valueProp.map(DateUtil.to).sort(DateUtil.sort);
  const [startDate, setStartDate] = React.useState<Date | null>(
    datesProp[0] || null
  );
  const [endDate, setEndDate] = React.useState<Date | null>(
    datesProp[1] || null
  );

  const today = DateUtil();
  const _startCurrentDate = DateUtil(startDate).clone(true);
  let _endCurrentDate = DateUtil(endDate || today.addMonths(1)).clone(true);
  if (DateUtil(_startCurrentDate).diffMonths(_endCurrentDate) === 0) {
    _endCurrentDate = DateUtil(_endCurrentDate).addMonths(1);
  }
  const [startCurrentDate, setStartCurrentDate] = React.useState(
    _startCurrentDate
  );
  const [endCurrentDate, setEndCurrentDate] = React.useState(_endCurrentDate);
  const startCurrentYear = startCurrentDate.getFullYear();
  const startCurrentMonth = startCurrentDate.getMonth();
  const endCurrentYear = endCurrentDate.getFullYear();
  const endCurrentMonth = endCurrentDate.getMonth();
  const diffOneMonth =
    startCurrentYear === endCurrentYear &&
    endCurrentMonth - startCurrentMonth === 1;

  const updateSelectedDates = (date: Date, isStart: boolean) => {
    let s = startDate;
    let e = endDate;
    if (startDate && endDate) s = e = null;
    if (isStart) {
      !s ? (s = date) : (e = date);
    } else {
      !e ? (e = date) : (s = date);
    }
    if (s && e && DateUtil(s).gt(e)) [s, e] = [e, s];
    setStartDate(s), setEndDate(e);
    s && e && onChange && onChange([s, e]);
  };

  const handleStartSelect = (date: Date) => {
    updateSelectedDates(date, true);
  };

  const handleEndSelect = (date: Date) => {
    updateSelectedDates(date, false);
  };

  const handleStartCurrentChange = (current: Date) => {
    const year = current.getFullYear();
    let month = current.getMonth();
    if (DateUtil(current).eq(endCurrentDate)) {
      month += month > startCurrentMonth ? 1 : -1;
    }
    const y = year !== startCurrentYear;
    const m = month !== startCurrentMonth;
    if (y || m) setStartCurrentDate(new Date(year, month));
  };

  const handleEndCurrentChange = (current: Date) => {
    const year = current.getFullYear();
    let month = current.getMonth();
    if (DateUtil(current).eq(startCurrentDate)) {
      month += month > endCurrentMonth ? 1 : -1;
    }
    const y = year !== endCurrentYear;
    const m = month !== endCurrentMonth;
    if (y || m) setEndCurrentDate(new Date(year, month));
  };

  const handleCellClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(startDate && !endDate) && !(!startDate && endDate)) {
      e.stopPropagation();
    }
    props.onCellClick && props.onCellClick(e);
  };

  const dyedDate = (date: Date) => {
    if (!startDate || !endDate) return false;
    const dateUtil = DateUtil(date);
    return dateUtil.gte(startDate) && dateUtil.lte(endDate);
  };

  const activedDate = (date: Date) => {
    if (!startDate || !endDate) return false;
    const dateUtil = DateUtil(date);
    return dateUtil.eq(startDate) || dateUtil.eq(endDate);
  };

  const cls = getComponentClasses('range-calendar', props);
  return (
    <div className={cls} style={props.style}>
      <Calendar
        {...calendarProps}
        activeToday={false}
        value={startDate}
        currentDate={startCurrentDate}
        hideHeaderNextRange={diffOneMonth}
        hideHeaderNext={diffOneMonth}
        dyedDate={dyedDate}
        activedDate={activedDate}
        onSelect={handleStartSelect}
        onCurrentDateChange={handleStartCurrentChange}
        onCellClick={handleCellClick}
      />
      <Calendar
        {...calendarProps}
        activeToday={false}
        value={endDate}
        currentDate={endCurrentDate}
        hideHeaderPreviousRange={diffOneMonth}
        hideHeaderPrevious={diffOneMonth}
        dyedDate={dyedDate}
        activedDate={activedDate}
        onSelect={handleEndSelect}
        onCurrentDateChange={handleEndCurrentChange}
        onCellClick={handleCellClick}
      />
      {children}
    </div>
  );
}

export default RangeCalendar;
