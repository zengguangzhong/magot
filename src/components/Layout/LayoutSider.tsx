import React from 'react';

import * as component from '../component';

export interface LayoutSiderProps extends component.BaseComponent {}

const defaultProps: Partial<LayoutSiderProps> = {};

function LayoutSider(props: LayoutSiderProps) {
  const cls = component.getComponentClasses('layout-sider', props);
  return <div className={cls} />;
}

LayoutSider.defaultProps = defaultProps;

export default LayoutSider;
