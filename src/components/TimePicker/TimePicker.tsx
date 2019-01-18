import React from 'react';

import './TimePicker.less';

import * as component from '../component';

export interface TimePickerProps extends component.ComponentBase {}

const defaultProps: Partial<TimePickerProps> = {};

function TimePicker(props: TimePickerProps) {
  const cls = component.getComponentClasses('time-picker', props);
  return <div className={cls} />;
}

TimePicker.defaultProps = defaultProps;

export default TimePicker;
