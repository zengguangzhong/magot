import React from 'react';

import './Drawer.less';

import * as component from '../component';

export interface DrawerProps extends component.ComponentBase {}

const defaultProps: Partial<DrawerProps> = {};

function Drawer(props: DrawerProps) {
  const cls = component.getComponentClasses('drawer', props);
  return <div className={cls} />;
}

Drawer.defaultProps = defaultProps;

export default Drawer;
