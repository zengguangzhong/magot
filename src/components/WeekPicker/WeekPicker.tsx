import React from 'react';
import cx from 'classnames';

import DatePicker, { DatePickerProps } from '../DatePicker';
import * as component from '../component';

import './WeekPicker.less';

export interface WeekPickerProps extends DatePickerProps {}

const defaultProps: Partial<WeekPickerProps> = {
  format: 'yyyy 第 w 周',
};

function WeekPicker(props: WeekPickerProps) {
  const cls = component.getComponentClasses('week-picker');
  return (
    <DatePicker
      {...props}
      className={cx(cls, props.className)}
      readOnly={true}
      calendarProps={{
        mode: 'week',
        className: cx(
          cls + '-calendar',
          props.calendarProps && props.calendarProps.className
        ),
      }}>
      {props.children}
    </DatePicker>
  );
}

WeekPicker.defaultProps = defaultProps;

export default WeekPicker;
