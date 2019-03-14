import React from 'react';
import cx from 'classnames';
import Calendar, { CalendarProps } from './Calendar';
import { getComponentClasses } from '../component';
import * as dateUtil from '../../utils/date';

function WeekCalendar(props: CalendarProps) {
  const handleChange = (date: Date) => {
    const weekNumber = dateUtil.getWeekNumber(date);
    props.onChange && props.onChange(date, weekNumber);
  };
  const handleSelect = (date: Date) => {
    const weekNumber = dateUtil.getWeekNumber(date);
    props.onSelect && props.onSelect(date, weekNumber);
  };
  const dyedDate = (date: Date, selectedDate: Date | null) => {
    if (!selectedDate) return false;
    if (date.getFullYear() !== selectedDate.getFullYear()) return false;
    const n1 = dateUtil.getWeekNumber(date);
    const n2 = dateUtil.getWeekNumber(selectedDate);
    return n1 === n2;
  };
  const cls = getComponentClasses('week-calendar');
  return (
    <Calendar
      {...props}
      className={cx(cls, props.className)}
      showWeekNumber={true}
      dyedDate={dyedDate}
      onChange={handleChange}
      onSelect={handleSelect}>
      {props.children}
    </Calendar>
  );
}

export default WeekCalendar;
