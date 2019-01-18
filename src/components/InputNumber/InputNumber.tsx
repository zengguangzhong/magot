import React from 'react';

import './InputNumber.less';

import * as component from '../component';

export interface InputNumberProps extends component.ComponentBase {}

const defaultProps: Partial<InputNumberProps> = {};

function InputNumber(props: InputNumberProps) {
  const cls = component.getComponentClasses('input-number', props);
  return <div className={cls} />;
}

InputNumber.defaultProps = defaultProps;

export default InputNumber;
