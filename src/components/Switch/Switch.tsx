import React from 'react';

import './Switch.less';

import * as component from '../component';

export interface SwitchProps extends component.BaseComponent {}

const defaultProps: Partial<SwitchProps> = {};

function Switch(props: SwitchProps) {
  const cls = component.getComponentClasses('switch', props);
  return <div className={cls} />;
}

Switch.defaultProps = defaultProps;

export default Switch;
