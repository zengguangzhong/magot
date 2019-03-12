import React from 'react';

import { CalendarProps, CalendarBodyProps } from './Calendar';
import CalendarWrapper from './CalendarWrapper';
import DateCalendarHeader from './DateCalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarWeek from './CalendarWeek';
import CalendarGrid from './CalendarGrid';
import CalendarRow from './CalendarRow';
import CalendarCell from './CalendarCell';
import CalendarCellNode from './CalendarCellNode';
import * as dateUtil from '../../utils/date';

const Calendar = CalendarWrapper(DateCalendarHeader, DateCalendarBody);

function DateCalendar(props: CalendarProps) {
  return <Calendar {...props}>{props.children}</Calendar>;
}

function DateCalendarBody(props: CalendarBodyProps) {
  const { currentYear, currentMonth, weekStart = 0 } = props;
  const datesByWeek = getDatesByWeek(currentYear, currentMonth, weekStart);
  const today = new Date();
  return (
    <CalendarBody>
      <CalendarWeek
        start={props.weekStart || 0}
        visible={!props.hideWeekBox}
        showWeekNumber={!!props.showWeekNumber}
        formatter={props.weekFormatter}
      />
      <CalendarGrid>
        {datesByWeek.map((dates, index) => {
          return (
            <DateCalendarRow
              {...props}
              dates={dates}
              today={today}
              key={index}
            />
          );
        })}
      </CalendarGrid>
    </CalendarBody>
  );
}

function DateCalendarRow(
  props: CalendarBodyProps & { dates: Date[]; today: Date }
) {
  const { dates } = props;
  const wednesday = dates.find(d => d.getDay() === 3);
  return (
    <CalendarRow>
      {props.showWeekNumber && (
        <CalendarCell className="week-number">
          {dateUtil.getWeekNumber(wednesday || dates[0])}
        </CalendarCell>
      )}
      {dates.map(date => {
        return <DateCalendarCell {...props} date={date} key={date.getTime()} />;
      })}
    </CalendarRow>
  );
}

function DateCalendarCell(
  props: CalendarBodyProps & { date: Date; today: Date }
) {
  const { date, dateFormatter = defaultDateFormatter } = props;
  const isToday = dateUtil.equalDate(date, props.today);

  let selected = dateUtil.equalDate(date, props.value);
  if (!props.value && props.activeToday) selected = isToday;
  if (!selected && props.activedDate) {
    selected = props.activedDate(date, props.value);
  }

  let dyed = false;
  if (props.dyedDate) {
    dyed = props.dyedDate(date, props.value);
  }

  const disabled = isDisabledDate(
    date,
    props.today,
    props.disableTodayAgo,
    props.disabledDate
  );

  const handleClick = () => props.onSelect(date);

  return (
    <CalendarCell
      dyed={dyed}
      current={isToday}
      selected={selected}
      disabled={disabled}
      outside={
        dateUtil.isPreviousMonth(date, props.currentMonth) ||
        dateUtil.isNextMonth(date, props.currentMonth)
      }
      onClick={handleClick}>
      <CalendarCellNode
        className={props.showWeekNumber ? 'week-date' : undefined}>
        {(isToday && props.todayText) || dateFormatter(date)}
      </CalendarCellNode>
    </CalendarCell>
  );
}

function getDatesByWeek(year: number, month: number, weekStart: number) {
  const datesByWeek: Date[][] = [];
  const firstDayOfMonth = dateUtil.getFirstDayOfMonth(year, month);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  let start = 0;
  const startDelta = firstDayOfWeek - weekStart;
  if (startDelta > 0) start -= startDelta;

  // grid: 6 * 7
  for (let i = start; i < 42 + start; i++) {
    const week = Math.floor((i + startDelta) / 7);
    let dates = datesByWeek[week];
    if (!dates) dates = datesByWeek[week] = [];
    const date = new Date(year, month, i + 1);
    dates.push(date);
  }

  return datesByWeek;
}

function isDisabledDate(
  date: Date,
  today: Date,
  disableTodayAgo?: boolean,
  disabledDate?: (date: Date) => boolean
) {
  if (disabledDate && disabledDate(date)) return true;
  if (disableTodayAgo && dateUtil.lessThanDate(date, today)) return true;
  return false;
}

function defaultDateFormatter(date: Date) {
  return '' + date.getDate();
}

export default DateCalendar;
