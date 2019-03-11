import React from 'react';

import { getPrefix } from './prefix';
import { NestedComponent, MouseEventComponent } from '../component';

interface CalendarFooterProps
  extends NestedComponent,
    MouseEventComponent<HTMLElement> {}

function CalendarFooter(props: CalendarFooterProps) {
  const prefix = getPrefix();
  return (
    <div className={prefix + '-footer'} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default CalendarFooter;
