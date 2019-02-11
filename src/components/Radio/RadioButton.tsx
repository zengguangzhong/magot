import React from 'react';

import Radio, { RadioProps } from './Radio';
import * as component from '../component';

import './RadioButton.less';

export interface RadioButtonProps
  extends RadioProps,
    component.SizedComponent {}

const defaultProps: Partial<RadioButtonProps> = {
  ...component.getDefaultSizedProps(),
};

function RadioButton(props: RadioButtonProps) {
  const { size, ...radioProps } = props;
  const cls = component.getComponentClasses('radio-button', { size });
  return (
    <Radio {...radioProps} className={cls}>
      {props.children}
    </Radio>
  );
}

RadioButton.defaultProps = defaultProps;

export default RadioButton;
