import React from 'react';

import {
  CalendarProps,
  CalendarHeaderProps,
  CalendarBodyProps,
} from './Calendar';
import CalendarWrapper from './CalendarWrapper';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarGrid from './CalendarGrid';
import CalendarRow from './CalendarRow';
import CalendarCell from './CalendarCell';
import CalendarCellNode from './CalendarCellNode';
import { getPrefix } from './prefix';
import * as dateUtil from '../../utils/date';

const Calendar = CalendarWrapper(DecadeCalendarHeader, DecadeCalendarBody);

function DecadeCalendar(props: CalendarProps) {
  return <Calendar {...props}>{props.children}</Calendar>;
}

function DecadeCalendarHeader(props: CalendarHeaderProps) {
  const { currentYear, onYearChange } = props;
  const decade = dateUtil.getDecade(currentYear);

  const handlePreviousCentury = () => {
    onYearChange && onYearChange(currentYear - 100);
  };
  const handleNextCentury = () => {
    onYearChange && onYearChange(currentYear + 100);
  };

  const title = (
    <span>
      {decade[0]}-{decade[1]}
    </span>
  );

  return (
    <CalendarHeader
      title={title}
      visible={!props.hideHeader}
      previousRangeVisible={!props.hideHeaderPreviousRange}
      nextRangeVisible={!props.hideHeaderNextRange}
      previousVisible={false}
      nextVisible={false}
      onPreviousRange={handlePreviousCentury}
      onNextRange={handleNextCentury}
      onClick={props.onHeaderClick}
    />
  );
}

function DecadeCalendarBody(props: CalendarBodyProps) {
  const decades = getDecadesByCentury(props.currentYear);
  return (
    <CalendarBody>
      <CalendarGrid>
        {[0, 1, 2, 3].map(row => {
          return (
            <CalendarRow key={row}>
              {[0, 1, 2].map(column => {
                const decade = decades[row * 3 + column];
                return (
                  <DecadeCalendarCell
                    {...props}
                    key={decade.join('-')}
                    decade={decade}
                    isFirst={decade === decades[0]}
                    isLast={decade === decades[decades.length - 1]}
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

function DecadeCalendarCell(
  props: CalendarBodyProps & {
    decade: number[];
    isFirst: boolean;
    isLast: boolean;
  }
) {
  const { decade, currentYear } = props;
  const selected = currentYear >= decade[0] && currentYear <= decade[1];
  const handleClick = () => {
    const date = (props.value || new Date()).getDate();
    props.onSelect(new Date(decade[0], props.currentMonth, date));
  };
  const prefix = getPrefix();
  return (
    <CalendarCell
      selected={selected}
      outside={props.isFirst || props.isLast}
      onClick={handleClick}>
      <CalendarCellNode className={prefix + '-decade'}>
        {props.decade.join('-')}
      </CalendarCellNode>
    </CalendarCell>
  );
}

function getDecadesByCentury(year: number) {
  const decades: number[][] = [];
  const century = dateUtil.getCentury(year);
  for (let i = century[0] - 10; i <= century[1] + 10; i += 10) {
    const decade = dateUtil.getDecade(i);
    decades.push(decade);
  }
  return decades;
}

export default DecadeCalendar;
