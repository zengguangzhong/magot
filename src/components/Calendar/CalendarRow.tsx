import React from 'react';
import cx from 'classnames';

import { getPrefix } from './prefix';
import { BaseComponent, NestedComponent } from '../component';

interface CalendarRowProps extends BaseComponent, NestedComponent {}

function CalendarRow(props: CalendarRowProps) {
  const prefix = getPrefix();
  return (
    <tr className={cx(prefix + '-row', props.className)}>{props.children}</tr>
  );
}

export default CalendarRow;
