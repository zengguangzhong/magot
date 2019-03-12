import React from 'react';

import {
  CalendarProps,
  CalendarHeaderProps,
  CalendarBodyProps,
} from './Calendar';
import CalendarWrapper from './CalendarWrapper';
import DecadeCalendar from './DecadeCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarGrid from './CalendarGrid';
import CalendarRow from './CalendarRow';
import CalendarCell from './CalendarCell';
import CalendarCellNode from './CalendarCellNode';
import { getPrefix } from './prefix';
import * as dateUtil from '../../utils/date';

const Calendar = CalendarWrapper(YearCalendarHeader, YearCalendarBody);

function YearCalendar(props: CalendarProps) {
  return <Calendar {...props}>{props.children}</Calendar>;
}

function YearCalendarHeader(props: CalendarHeaderProps) {
  const { currentYear, currentMonth, onYearChange } = props;
  const prefix = getPrefix();
  const decade = dateUtil.getDecade(currentYear);
  const date = new Date(currentYear, currentMonth);

  const handlePreviousDecade = () => {
    onYearChange && onYearChange(currentYear - 10);
  };
  const handleNextDecade = () => {
    onYearChange && onYearChange(currentYear + 10);
  };

  const [decadeVisible, setDecadeVisible] = React.useState(false);

  const handleDecadeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!decadeVisible) setDecadeVisible(true);
  };

  const handleDecadeChange = (date: Date) => {
    const newYear = date.getFullYear();
    if (newYear !== currentYear) onYearChange && onYearChange(newYear);
    setDecadeVisible(false);
  };

  const title = (
    <a href="javascript:;" onClick={handleDecadeClick}>
      {decade[0]}-{decade[1]}
    </a>
  );

  return (
    <CalendarHeader
      title={title}
      visible={!props.hideHeader}
      previousRangeVisible={!props.hideHeaderPreviousRange}
      nextRangeVisible={!props.hideHeaderNextRange}
      previousVisible={false}
      nextVisible={false}
      onPreviousRange={handlePreviousDecade}
      onNextRange={handleNextDecade}
      onClick={props.onHeaderClick}>
      {decadeVisible && (
        <DecadeCalendar
          className={prefix + '-selector'}
          value={date}
          onChange={handleDecadeChange}
        />
      )}
    </CalendarHeader>
  );
}

function YearCalendarBody(props: CalendarBodyProps) {
  const years = getYearsByDecade(props.currentYear);
  return (
    <CalendarBody>
      <CalendarGrid>
        {[0, 1, 2, 3].map(row => {
          return (
            <CalendarRow key={row}>
              {[0, 1, 2].map(column => {
                const year = years[row * 3 + column];
                return (
                  <YearCalendarCell
                    {...props}
                    key={year}
                    year={year}
                    isFirst={year === years[0]}
                    isLast={year === years[years.length - 1]}
                  />
                );
              })}
            </CalendarRow>
          );
        })}
      </CalendarGrid>
    </CalendarBody>
  );
}

function YearCalendarCell(
  props: CalendarBodyProps & {
    year: number;
    isFirst: boolean;
    isLast: boolean;
  }
) {
  const { yearFormatter = defaultYearFormatter } = props;
  const selected = props.year === props.currentYear;
  const handleClick = () => {
    const date = (props.value || new Date()).getDate();
    props.onSelect(new Date(props.year, props.currentMonth, date));
  };
  const prefix = getPrefix();
  return (
    <CalendarCell
      selected={selected}
      outside={props.isFirst || props.isLast}
      onClick={handleClick}>
      <CalendarCellNode className={prefix + '-year'}>
        {yearFormatter(props.year)}
      </CalendarCellNode>
    </CalendarCell>
  );
}

function getYearsByDecade(year: number) {
  const years: number[] = [];
  const decade = dateUtil.getDecade(year);
  for (let i = decade[0] - 1; i <= decade[1] + 1; i++) {
    years.push(i);
  }
  return years;
}

function defaultYearFormatter(year: number) {
  return '' + year;
}

export default YearCalendar;
