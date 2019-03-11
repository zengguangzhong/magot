import React from 'react';
import cx from 'classnames';

import { getPrefix } from './prefix';
import {
  BaseComponent,
  NestedComponent,
  MouseEventComponent,
} from '../component';

interface CalendarCellNodeProps
  extends BaseComponent,
    NestedComponent,
    MouseEventComponent<HTMLElement> {}

function CalendarCellNode(props: CalendarCellNodeProps) {
  const prefix = getPrefix();
  return (
    <span
      className={cx(prefix + '-date', props.className)}
      onClick={props.onClick}>
      {props.children}
    </span>
  );
}

export default CalendarCellNode;
