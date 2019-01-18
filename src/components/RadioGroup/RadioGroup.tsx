import React from 'react';

import './RadioGroup.less';

import * as component from '../component';

export interface RadioGroupProps extends component.ComponentBase {}

const defaultProps: Partial<RadioGroupProps> = {};

function RadioGroup(props: RadioGroupProps) {
  const cls = component.getComponentClasses('radio-group', props);
  return <div className={cls} />;
}

RadioGroup.defaultProps = defaultProps;

export default RadioGroup;
