import React from 'react';

import InputBase, { InputBaseProps } from '../InputBase';
import * as component from '../component';

import './Input.less';

export interface InputProps
  extends InputBaseProps<HTMLInputElement>,
    component.SizedComponent {}

const defaultProps: Partial<InputProps> = {
  ...component.getDefaultSizedProps(),
};

function Input(props: InputProps) {
  return (
    <InputBase {...props}>
      <input type="text" />
    </InputBase>
  );
}

Input.defaultProps = defaultProps;

export default Input;
