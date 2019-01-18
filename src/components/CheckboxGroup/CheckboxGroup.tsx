import React from 'react';

import './CheckboxGroup.less';

import * as component from '../component';

export interface CheckboxGroupProps extends component.ComponentBase {}

const defaultProps: Partial<CheckboxGroupProps> = {};

function CheckboxGroup(props: CheckboxGroupProps) {
  const cls = component.getComponentClasses('checkbox-group', props);
  return <div className={cls} />;
}

CheckboxGroup.defaultProps = defaultProps;

export default CheckboxGroup;
