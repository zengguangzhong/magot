/// <reference path="../../../lib.d.ts" />
import React from 'react';

import * as component from '../component';

import './RangePicker.less';

export interface RangePickerProps extends component.BaseComponent {}

const defaultProps: Partial<RangePickerProps> = {};

function RangePicker(props: RangePickerProps) {
  const cls = component.getComponentClasses('range-picker', props);
  return <div className={cls} style={props.style} />;
}

RangePicker.defaultProps = defaultProps;

export default RangePicker;
