import React from 'react';

import { getPrefix } from './prefix';
import { NestedComponent } from '../component';

interface CalendarGridProps extends NestedComponent {}

function CalendarGrid(props: CalendarGridProps) {
  const prefix = getPrefix();
  return <tbody className={prefix + '-grid'}>{props.children}</tbody>;
}

export default CalendarGrid;
