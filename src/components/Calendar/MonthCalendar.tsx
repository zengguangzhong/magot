import React from 'react';

import {
  CalendarProps,
  CalendarHeaderProps,
  CalendarBodyProps,
} from './Calendar';
import CalendarWrapper from './CalendarWrapper';
import DateCalendarHeader from './DateCalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarGrid from './CalendarGrid';
import CalendarRow from './CalendarRow';
import CalendarCell from './CalendarCell';
import CalendarCellNode from './CalendarCellNode';
import { getPrefix } from './prefix';

const Calendar = CalendarWrapper(MonthCalendarHeader, MonthCalendarBody);

function MonthCalendar(props: CalendarProps) {
  return <Calendar {...props}>{props.children}</Calendar>;
}

function MonthCalendarHeader(props: CalendarHeaderProps) {
  return (
    <DateCalendarHeader
      {...props}
      hideHeaderMonth={true}
      hideHeaderPrevious={true}
      hideHeaderNext={true}>
      {props.children}
    </DateCalendarHeader>
  );
}

function MonthCalendarBody(props: CalendarBodyProps) {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <CalendarBody>
      <CalendarGrid>
        {[0, 1, 2, 3].map(row => (
          <CalendarRow key={row}>
            {[0, 1, 2].map(column => {
              const month = months[row * 3 + column];
              return <MonthCalendarCell {...props} key={month} month={month} />;
            })}
          </CalendarRow>
        ))}
      </CalendarGrid>
    </CalendarBody>
  );
}

function MonthCalendarCell(props: CalendarBodyProps & { month: number }) {
  const { monthFormatter = defaultMonthFormatter } = props;
  const selected = props.month === props.currentMonth;
  const handleClick = () => {
    const date = (props.value || new Date()).getDate();
    props.onSelect(new Date(props.currentYear, props.month, date));
  };
  const prefix = getPrefix();
  return (
    <CalendarCell selected={selected} onClick={handleClick}>
      <CalendarCellNode className={prefix + '-month'}>
        {monthFormatter(props.month)}
      </CalendarCellNode>
    </CalendarCell>
  );
}

function defaultMonthFormatter(month: number) {
  const localMonths = '一 二 三 四 五 六 七 八 九 十 十一 十二'.split(' ');
  return localMonths[month] + '月';
}

export default MonthCalendar;
