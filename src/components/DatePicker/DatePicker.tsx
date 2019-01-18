import React from 'react';

import './DatePicker.less';

import * as component from '../component';

export interface DatePickerProps extends component.ComponentBase {}

const defaultProps: Partial<DatePickerProps> = {};

function DatePicker(props: DatePickerProps) {
  const cls = component.getComponentClasses('date-picker', props);
  return <div className={cls} />;
}

DatePicker.defaultProps = defaultProps;

export default DatePicker;
