import React from 'react';
import cx from 'classnames';

import { DatePickerProps } from '../DatePicker';
import MonthCalendar from '../Calendar/MonthCalendar';
import DatePickerWrapper from '../DatePicker/DatePickerWrapper';
import * as component from '../component';

import './MonthPicker.less';

const defaultProps: Partial<DatePickerProps> = {
  format: 'yyyy-MM',
};

const Picker = DatePickerWrapper(MonthCalendar);

function MonthPicker(props: DatePickerProps) {
  const cls = component.getComponentClasses('month-picker');
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

MonthPicker.defaultProps = defaultProps;

export default MonthPicker;
