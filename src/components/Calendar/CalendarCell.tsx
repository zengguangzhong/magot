import React from 'react';
import cx from 'classnames';

import { getPrefix } from './prefix';
import {
  BaseComponent,
  NestedComponent,
  MouseEventComponent,
} from '../component';

interface CalendarCellProps
  extends BaseComponent,
    NestedComponent,
    MouseEventComponent<HTMLTableDataCellElement> {
  dyed?: boolean;
  current?: boolean;
  selected?: boolean;
  disabled?: boolean;
  outside?: boolean;
}

const defaultProps: Partial<CalendarCellProps> = {
  dyed: false,
  selected: false,
  disabled: false,
};

function CalendarCell(props: CalendarCellProps) {
  const {
    dyed,
    current,
    selected,
    disabled,
    outside,
    children,
    ...otherProps
  } = props;
  const prefix = getPrefix();
  return (
    <td
      {...otherProps}
      className={cx(
        prefix + '-cell',
        { dyed, current, selected, disabled, outside },
        props.className
      )}>
      {children}
    </td>
  );
}

CalendarCell.defaultProps = defaultProps;

export default CalendarCell;
