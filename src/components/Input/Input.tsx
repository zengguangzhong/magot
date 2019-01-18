import React from 'react';

import './Input.less';

import * as component from '../component';

export interface InputProps extends component.ComponentBase {}

const defaultProps: Partial<InputProps> = {};

function Input(props: InputProps) {
  const cls = component.getComponentClasses('input', props);
  return <div className={cls} />;
}

Input.defaultProps = defaultProps;

export default Input;
