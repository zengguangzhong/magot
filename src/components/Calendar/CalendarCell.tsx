import React from 'react';
import cx from 'classnames';

import { getPrefix } from './prefix';
import { BaseComponent, NestedComponent } from '../component';

interface CalendarCellProps extends BaseComponent, NestedComponent {
  selected?: boolean;
  disabled?: boolean;
  outside?: boolean;
}

const defaultProps: Partial<CalendarCellProps> = {
  selected: false,
  disabled: false,
};

function CalendarCell(props: CalendarCellProps) {
  const { children, className, selected, disabled, outside } = props;
  const prefix = getPrefix();
  return (
    <td
      className={cx(
        prefix + '-cell',
        { selected, disabled, outside },
        className
      )}>
      {children}
    </td>
  );
}

CalendarCell.defaultProps = defaultProps;

export default CalendarCell;
