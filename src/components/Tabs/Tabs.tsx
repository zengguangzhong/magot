import React from 'react';

import './Tabs.less';

import * as component from '../component';

export interface TabsProps extends component.ComponentBase {}

const defaultProps: Partial<TabsProps> = {};

function Tabs(props: TabsProps) {
  const cls = component.getComponentClasses('tabs', props);
  return <div className={cls} />;
}

Tabs.defaultProps = defaultProps;

export default Tabs;
