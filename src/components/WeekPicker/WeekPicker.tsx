import React from 'react';

import * as component from '../component';

import './WeekPicker.less';

export interface WeekPickerProps extends component.BaseComponent {}

const defaultProps: Partial<WeekPickerProps> = {};

function WeekPicker(props: WeekPickerProps) {
  const cls = component.getComponentClasses('week-picker', props);
  return <div className={cls} style={props.style} />;
}

WeekPicker.defaultProps = defaultProps;

export default WeekPicker;
