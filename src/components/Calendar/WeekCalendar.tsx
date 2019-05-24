import React from 'react';
import cx from 'classnames';
import Calendar, { CalendarProps } from './Calendar';
import { getComponentClasses } from '../component';
import DateUtil from '../../utils/date';

function WeekCalendar(props: CalendarProps) {
  const handleChange = (date: Date) => {
    const weekNumber = DateUtil(date).getWeekNumber();
    props.onChange && props.onChange(date, weekNumber);
  };

  const handleSelect = (date: Date) => {
    const weekNumber = DateUtil(date).getWeekNumber();
    props.onSelect && props.onSelect(date, weekNumber);
  };

  const dyedDate = (date: Date, selectedDate: Date | null) => {
    if (!selectedDate) return false;
    if (date.getFullYear() !== selectedDate.getFullYear()) return false;
    const n1 = DateUtil(date).getWeekNumber();
    const n2 = DateUtil(selectedDate).getWeekNumber();
    return n1 === n2;
  };

  const cls = getComponentClasses('week-calendar');
  return (
    <Calendar
      {...props}
      className={cx(cls, props.className)}
      showWeekNumber={true}
      dyeingRow={true}
      dyedDate={dyedDate}
      onChange={handleChange}
      onSelect={handleSelect}>
      {props.children}
    </Calendar>
  );
}

export default WeekCalendar;
