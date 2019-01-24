import React from 'react';

import './Dropdown.less';

import * as component from '../component';

export interface DropdownProps extends component.BaseComponent {}

const defaultProps: Partial<DropdownProps> = {};

function Dropdown(props: DropdownProps) {
  const cls = component.getComponentClasses('dropdown', props);
  return <div className={cls} />;
}

Dropdown.defaultProps = defaultProps;

export default Dropdown;
