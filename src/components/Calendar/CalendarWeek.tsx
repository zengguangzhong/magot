import React from 'react';
import cx from 'classnames';

import CalendarRow from './CalendarRow';
import * as component from '../component';

export interface CalendarWeekProps {
  start: number;
  visible?: boolean;
  showWeekNumber?: boolean;
  formatter?: (value: number) => string;
}

function defaultWeekFormatter(value: number) {
  const localWeek = '日一二三四五六'.split('');
  return localWeek[value];
}

const defaultProps: Partial<CalendarWeekProps> = {
  visible: true,
  showWeekNumber: false,
};

function CalendarWeek(props: CalendarWeekProps) {
  if (!props.visible) return null;
  const { start, formatter = defaultWeekFormatter } = props;
  const week = [];
  for (let i = start; i < start + 7; i++) {
    week.push(i < 7 ? i : i - 7);
  }
  const prefix = component.getComponentPrefix('calendar');
  return (
    <thead className={prefix + '-head'}>
      <CalendarRow>
        {!!props.showWeekNumber && (
          <th className={cx(prefix + '-head-cell', 'week-number')} />
        )}
        {week.map(v => (
          <th className={prefix + '-head-cell'} key={v}>
            {formatter(v)}
          </th>
        ))}
      </CalendarRow>
    </thead>
  );
}

CalendarWeek.defaultProps = defaultProps;

export default CalendarWeek;
