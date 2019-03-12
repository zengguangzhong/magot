import React from 'react';
import cx from 'classnames';

import { getPrefix } from './prefix';
import { BaseComponent, NestedComponent } from '../component';

interface CalendarCellNodeProps extends BaseComponent, NestedComponent {}

function CalendarCellNode(props: CalendarCellNodeProps) {
  const prefix = getPrefix();
  return (
    <span className={cx(prefix + '-date', props.className)}>
      {props.children}
    </span>
  );
}

export default CalendarCellNode;
