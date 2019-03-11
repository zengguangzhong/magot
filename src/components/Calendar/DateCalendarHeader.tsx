import React from 'react';

import { CalendarHeaderProps } from './Calendar';
import YearCalendar from './YearCalendar';
import MonthCalendar from './MonthCalendar';
import CalendarHeader from './CalendarHeader';
import { getPrefix } from './prefix';

export interface DateCalendarHeaderProps extends CalendarHeaderProps {
  hideHeaderMonth?: boolean;
}

const defaultProps: Partial<DateCalendarHeaderProps> = {
  hideHeaderMonth: false,
  headerYearFormatter: defaultYearFormatter,
  headerMonthFormatter: defaultMonthFormatter,
};

function DateCalendarHeader(props: DateCalendarHeaderProps) {
  const {
    currentYear,
    currentMonth,
    hideHeaderMonth,
    headerYearFormatter = defaultYearFormatter,
    headerMonthFormatter = defaultMonthFormatter,
    onYearChange,
    onMonthChange,
  } = props;

  const [yearSelectorVisible, setYearSelectorVisible] = React.useState(false);
  const [monthSelectorVisible, setMonthSelectorVisible] = React.useState(false);

  const handlePreviousYear = () => {
    onYearChange && onYearChange(currentYear - 1);
  };
  const handleNextYear = () => {
    onYearChange && onYearChange(currentYear + 1);
  };
  const handlePreviousMonth = () => {
    onMonthChange && onMonthChange(currentMonth - 1);
  };
  const handleNextMonth = () => {
    onMonthChange && onMonthChange(currentMonth + 1);
  };

  const handleYearClick = () => {
    if (!yearSelectorVisible) setYearSelectorVisible(true);
  };

  const handleMonthClick = () => {
    if (!monthSelectorVisible) setMonthSelectorVisible(true);
  };

  const handleYearSelectorChange = (date: Date) => {
    const newYear = date.getFullYear();
    if (newYear !== currentYear) {
      props.onYearChange && props.onYearChange(newYear);
    }
    setYearSelectorVisible(false);
  };

  const handleMonthSelectorChange = (date: Date) => {
    const newYear = date.getFullYear();
    const newMonth = date.getMonth();
    if (newYear !== currentYear) {
      props.onYearChange && props.onYearChange(newYear);
    }
    if (newMonth !== currentMonth) {
      props.onMonthChange && props.onMonthChange(newMonth);
    }
    setMonthSelectorVisible(false);
  };

  const prefix = getPrefix();
  const date = new Date(currentYear, currentMonth);

  const title = (
    <>
      <a href="javascript:;" onClick={handleYearClick}>
        {headerYearFormatter(currentYear)}
      </a>
      {!hideHeaderMonth && (
        <a href="javascript:;" onClick={handleMonthClick}>
          {headerMonthFormatter(currentMonth)}
        </a>
      )}
    </>
  );

  return (
    <CalendarHeader
      title={title}
      visible={!props.hideHeader}
      previousVisible={!hideHeaderMonth}
      nextVisible={!hideHeaderMonth}
      onPreviousRange={handlePreviousYear}
      onNextRange={handleNextYear}
      onPrevious={handlePreviousMonth}
      onNext={handleNextMonth}
      onClick={props.onHeaderClick}>
      {yearSelectorVisible && (
        <YearCalendar
          className={prefix + '-selector'}
          value={date}
          yearFormatter={props.yearFormatter}
          headerYearFormatter={props.headerYearFormatter}
          onChange={handleYearSelectorChange}
        />
      )}
      {monthSelectorVisible && (
        <MonthCalendar
          className={prefix + '-selector'}
          value={date}
          yearFormatter={props.yearFormatter}
          monthFormatter={props.monthFormatter}
          headerYearFormatter={props.headerYearFormatter}
          headerMonthFormatter={props.headerMonthFormatter}
          onChange={handleMonthSelectorChange}
        />
      )}
    </CalendarHeader>
  );
}

DateCalendarHeader.defaultProps = defaultProps;

function defaultYearFormatter(year: number) {
  return year + '年';
}

function defaultMonthFormatter(month: number) {
  return month + 1 + '月';
}

export default DateCalendarHeader;
