import React from 'react';
import cx from 'classnames';

import { DatePickerProps } from '../DatePicker';
import WeekCalendar from '../Calendar/WeekCalendar';
import DatePickerWrapper from '../DatePicker/DatePickerWrapper';
import * as component from '../component';

import './WeekPicker.less';

const defaultProps: Partial<DatePickerProps> = {
  format: 'yyyy 第 w 周',
};

const Picker = DatePickerWrapper(WeekCalendar);

function WeekPicker(props: DatePickerProps) {
  const cls = component.getComponentClasses('week-picker');
  return (
    <Picker
      {...props}
      className={cx(cls, props.className)}
      readOnly={true}
      calendarProps={{
        className: cx(
          cls + '-calendar',
          props.calendarProps && props.calendarProps.className
        ),
      }}>
      {props.children}
    </Picker>
  );
}

WeekPicker.defaultProps = defaultProps;

export default WeekPicker;
