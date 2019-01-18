import React from 'react';

import './DateTimePicker.less';

import * as component from '../component';

export interface DateTimePickerProps extends component.ComponentBase {}

const defaultProps: Partial<DateTimePickerProps> = {};

function DateTimePicker(props: DateTimePickerProps) {
  const cls = component.getComponentClasses('date-time-picker', props);
  return <div className={cls} />;
}

DateTimePicker.defaultProps = defaultProps;

export default DateTimePicker;
