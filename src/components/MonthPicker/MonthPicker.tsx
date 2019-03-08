import React from 'react';
import cx from 'classnames';

import DatePicker, { DatePickerProps } from '../DatePicker';
import * as component from '../component';

import './MonthPicker.less';

export interface MonthPickerProps extends DatePickerProps {}

const defaultProps: Partial<MonthPickerProps> = {
  format: 'yyyy-MM',
};

function MonthPicker(props: MonthPickerProps) {
  const cls = component.getComponentClasses('month-picker');
  return (
    <DatePicker
      {...props}
      className={cx(cls, props.className)}
      calendarProps={{
        mode: 'month',
        className: cx(
          cls + '-calendar',
          props.calendarProps && props.calendarProps.className
        ),
      }}>
      {props.children}
    </DatePicker>
  );
}

MonthPicker.defaultProps = defaultProps;

export default MonthPicker;
