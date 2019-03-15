/// <reference path="../../../lib.d.ts" />
import React from 'react';
import Calendar, { CalendarNormalProps } from './Calendar';
import { getComponentClasses } from '../component';
import * as dateUtil from '../../utils/date';

export interface RangeCalendarProps extends CalendarNormalProps {
  /**
   * 当前选中的日期范围
   */
  value?: Array<AcceptableDate> | null;

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

  const today = new Date();
  const valueProp = (value || []).slice(0, 2);
  const datesProp = valueProp.map(dateUtil.getSafeDate).sort(dateUtil.sortDate);
  const [startDate, setStartDate] = React.useState<Date | null>(
    datesProp[0] || null
  );
  const [endDate, setEndDate] = React.useState<Date | null>(
    datesProp[1] || null
  );

  const _startCurrentDate = startDate || today;
  let _endCurrentDate = endDate || dateUtil.addMonths(1, today);
  if (dateUtil.diffMonths(_startCurrentDate, _endCurrentDate) === 0) {
    _endCurrentDate = dateUtil.addMonths(1, _endCurrentDate);
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
    if (s && e && dateUtil.greaterThanDate(s, e)) [s, e] = [e, s];
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
    if (dateUtil.equalDate(current, endCurrentDate, true)) {
      month += month > startCurrentMonth ? 1 : -1;
    }
    const y = year !== startCurrentYear;
    const m = month !== startCurrentMonth;
    if (y || m) setStartCurrentDate(new Date(year, month));
  };

  const handleEndCurrentChange = (current: Date) => {
    const year = current.getFullYear();
    let month = current.getMonth();
    if (dateUtil.equalDate(current, startCurrentDate, true)) {
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
    const gt = dateUtil.greaterThanOrEqualDate(date, startDate);
    const lt = dateUtil.lessThanOrEqualDate(date, endDate);
    return gt && lt;
  };

  const activedDate = (date: Date) => {
    if (!startDate || !endDate) return false;
    const es = dateUtil.equalDate(date, startDate);
    const ee = dateUtil.equalDate(date, endDate);
    return es || ee;
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
