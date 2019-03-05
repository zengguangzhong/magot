import React from 'react';

import * as component from '../component';

import './MonthPicker.less';

export interface MonthPickerProps extends component.BaseComponent {}

const defaultProps: Partial<MonthPickerProps> = {};

function MonthPicker(props: MonthPickerProps) {
  const cls = component.getComponentClasses('month-picker', props);
  return <div className={cls} style={props.style} />;
}

MonthPicker.defaultProps = defaultProps;

export default MonthPicker;
