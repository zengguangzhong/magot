import React from 'react';

import './Calendar.less';

import * as component from '../component';

export interface CalendarProps extends component.BaseComponent {}

const defaultProps: Partial<CalendarProps> = {};

function Calendar(props: CalendarProps) {
  const cls = component.getComponentClasses('calendar', props);
  return <div className={cls} />;
}

Calendar.defaultProps = defaultProps;

export default Calendar;
