import React from 'react';

import './ColorPicker.less';

import * as component from '../component';

export interface ColorPickerProps extends component.BaseComponent {}

const defaultProps: Partial<ColorPickerProps> = {};

function ColorPicker(props: ColorPickerProps) {
  const cls = component.getComponentClasses('color-picker', props);
  return <div className={cls} />;
}

ColorPicker.defaultProps = defaultProps;

export default ColorPicker;
