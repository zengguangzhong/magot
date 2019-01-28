import React from 'react';

import * as component from '../component';

import './CheckboxGroup.less';

export interface CheckboxGroupProps extends component.BaseComponent {}

const defaultProps: Partial<CheckboxGroupProps> = {};

function CheckboxGroup(props: CheckboxGroupProps) {
  const cls = component.getComponentClasses('checkbox-group', props);
  return <div className={cls} />;
}

CheckboxGroup.defaultProps = defaultProps;

export default CheckboxGroup;
