import React, { ComponentType } from 'react';

import {
  CalendarProps,
  CalendarHeaderProps,
  CalendarBodyProps,
} from './Calendar';
import CalendarFooter from './CalendarFooter';
import { getComponentClasses } from '../component';

import { useChanges } from '../../hooks/changes';
import * as dateUtil from '../../utils/date';

import './Calendar.less';

const defaultProps: Partial<CalendarProps> = {
  disableTodayAgo: false,
  highlightToday: true,
  highlightRow: false,
  hideWeekBox: false,
  hideHeader: false,
  hideHeaderYear: false,
  hideHeaderMonth: false,
  hideHeaderPreviousRange: false,
  hideHeaderPrevious: false,
  hideHeaderNextRange: false,
  hideHeaderNext: false,
  showWeekNumber: false,
  weekStart: 0,
};

function CalendarWrapper(
  CalendarHeader: ComponentType<CalendarHeaderProps>,
  CalendarBody: ComponentType<CalendarBodyProps>
) {
  function Calendar(props: CalendarProps) {
    const { defaultValue, value } = props;

    const today = new Date();
    const valueProp = defaultValue || value;
    const dateProp = valueProp ? dateUtil.getSafeDate(valueProp) : null;
    const yearProp = (dateProp || today).getFullYear();
    const monthProp = (dateProp || today).getMonth();

    const internallyRef = React.useRef(false);
    const [selectedDate, setSelectedDate] = useChanges<Date | null>(
      dateProp,
      internallyRef.current,
      dateUtil.isEqualDate
    );
    const [currentYear, setCurrentYear] = React.useState(yearProp);
    const [currentMonth, setCurrentMonth] = React.useState(monthProp);

    internallyRef.current = false;

    const handleYearChange = (year: number) => {
      internallyRef.current = true;
      setCurrentYear(year);
      props.onYearChange && props.onYearChange(year);
    };

    const handleMonthChange = (month: number) => {
      internallyRef.current = true;
      if (month < 0) {
        const newYear = currentYear - 1;
        setCurrentYear(newYear);
        setCurrentMonth(11);
      } else if (month > 11) {
        const newYear = currentYear + 1;
        setCurrentYear(newYear);
        setCurrentMonth(0);
      } else {
        setCurrentMonth(month);
      }
      props.onMonthChange && props.onMonthChange(month);
    };

    const handleSelectDate = (date: Date) => {
      if (!dateUtil.isEqualDate(date, selectedDate)) {
        internallyRef.current = true;
        setSelectedDate(date);
        if (!dateUtil.isCurrentMonth(date, currentMonth)) {
          setCurrentMonth(date.getMonth());
        }
        if (!dateUtil.isCurrentYear(date, currentYear)) {
          setCurrentYear(date.getFullYear());
        }
      }
      props.onChange && props.onChange(date);
    };

    const cls = getComponentClasses('calendar', props);

    return (
      <div className={cls} style={props.style}>
        <CalendarHeader
          {...props}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
        />
        <CalendarBody
          {...props}
          value={selectedDate}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onSelect={handleSelectDate}
        />
        {props.children && (
          <CalendarFooter onClick={props.onFooterClick}>
            {props.children}
          </CalendarFooter>
        )}
      </div>
    );
  }
  Calendar.defaultProps = defaultProps;
  return Calendar;
}

export default CalendarWrapper;
