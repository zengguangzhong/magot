import React from 'react';

import { CalendarProps } from './Calendar';
import DateCalendar from './DateCalendar';
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
    const n1 = dateUtil.getWeekNumber(date);
    const n2 = dateUtil.getWeekNumber(selectedDate);
    return n1 === n2;
  };
  return (
    <DateCalendar
      {...props}
      showWeekNumber={true}
      dyedDate={dyedDate}
      onChange={handleChange}
      onSelect={handleSelect}>
      {props.children}
    </DateCalendar>
  );
}

export default WeekCalendar;
