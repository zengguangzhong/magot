import React from 'react';

import InputBase, { InputBaseProps } from '../InputBase';
import TextArea from '../TextArea';
import Password from '../Password';

import './Input.less';

export interface InputProps extends InputBaseProps<HTMLInputElement> {}

const defaultProps: Partial<InputProps> = {};

function Input(props: InputProps) {
  return (
    <InputBase {...props}>
      <input type="text" />
    </InputBase>
  );
}

Input.defaultProps = defaultProps;
Input.TextArea = TextArea;
Input.Password = Password;

export default Input;
