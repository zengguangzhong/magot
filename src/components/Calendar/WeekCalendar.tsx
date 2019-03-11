import React from 'react';

import { CalendarProps } from './Calendar';
import DateCalendar from './DateCalendar';
import * as dateUtil from '../../utils/date';

function WeekCalendar(props: CalendarProps) {
  const handleChange = (date: Date) => {
    const weekNumber = dateUtil.getWeekNumber(date);
    props.onChange && props.onChange(date, weekNumber);
  };
  return (
    <DateCalendar
      {...props}
      highlightRow={true}
      showWeekNumber={true}
      onChange={handleChange}>
      {props.children}
    </DateCalendar>
  );
}

export default WeekCalendar;
