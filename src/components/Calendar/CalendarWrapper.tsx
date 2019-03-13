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

interface InternallyRef {
  selected?: Date;
  current?: Date;
}

const defaultProps: Partial<CalendarProps> = {
  disableTodayAgo: false,
  activeToday: true,
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
    const { defaultValue, value, current } = props;

    const today = new Date();
    const valueProp = defaultValue || value;
    const dateProp = valueProp ? dateUtil.getSafeDate(valueProp) : null;
    const currentProp = current ? dateUtil.getSafeDate(current) : today;

    const internallyRef = React.useRef<InternallyRef | null>(null);

    let isInternally = false;
    if (internallyRef.current) {
      isInternally =
        !!internallyRef.current.selected || !!internallyRef.current.current;
    }

    const [selectedDate, setSelectedDate] = useChanges(
      dateProp,
      isInternally,
      dateUtil.equalDate
    );

    const [currentDate, setCurrentDate] = useChanges(
      currentProp,
      isInternally,
      (a, b) => dateUtil.equalDate(a, b, true)
    );
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    if (internallyRef.current) {
      const ref = internallyRef.current;
      if (ref.selected !== void 0) {
        props.onChange && props.onChange(ref.selected);
      }
      if (ref.current !== void 0) {
        props.onCurrentChange && props.onCurrentChange(ref.current);
      }
      internallyRef.current = null;
    }

    const handleYearChange = (year: number) => {
      const current = new Date(year, currentMonth);
      internallyRef.current = { current };
      setCurrentDate(current);
    };

    const handleMonthChange = (month: number) => {
      const current = new Date(currentYear, month);
      if (month < 0) {
        current.setFullYear(currentYear - 1);
        current.setMonth(11);
        setCurrentDate(current);
      } else if (month > 11) {
        current.setFullYear(currentYear + 1);
        current.setMonth(0);
        setCurrentDate(current);
      } else {
        setCurrentDate(current);
      }
      internallyRef.current = { current };
    };

    const handleSelectDate = (date: Date) => {
      if (!dateUtil.equalDate(date, selectedDate)) {
        const ref: InternallyRef = { selected: date };
        setSelectedDate(date);
        const y = dateUtil.isCurrentYear(date, currentYear);
        const m = dateUtil.isCurrentMonth(date, currentMonth);
        if (!y || !m) {
          ref.current = date;
          setCurrentDate(date);
        }
        internallyRef.current = ref;
      }
      props.onSelect && props.onSelect(date);
    };

    const cls = getComponentClasses('calendar', props);

    return (
      <div className={cls} style={props.style}>
        <CalendarHeader
          {...props}
          currentYear={currentYear}
          currentMonth={currentMonth}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
        />
        <CalendarBody
          {...props}
          value={selectedDate}
          currentYear={currentYear}
          currentMonth={currentMonth}
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
