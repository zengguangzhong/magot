import React from 'react';

import { getPrefix } from './prefix';
import { NestedComponent } from '../component';

interface CalendarBodyProps extends NestedComponent {}

function CalendarBody(props: CalendarBodyProps) {
  const prefix = getPrefix();
  return (
    <div className={prefix + '-body'}>
      <table cellSpacing={0} cellPadding={0} className={prefix + '-table'}>
        {props.children}
      </table>
    </div>
  );
}

export default CalendarBody;
