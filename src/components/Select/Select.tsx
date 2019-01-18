import React from 'react';

import './Select.less';

import * as component from '../component';

export interface SelectProps extends component.ComponentBase {}

const defaultProps: Partial<SelectProps> = {};

function Select(props: SelectProps) {
  const cls = component.getComponentClasses('select', props);
  return <div className={cls} />;
}

Select.defaultProps = defaultProps;

export default Select;
