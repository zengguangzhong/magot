import React from 'react';

import * as component from '../component';

export interface TabPaneProps extends component.ComponentBase {}

const defaultProps: Partial<TabPaneProps> = {};

function TabPane(props: TabPaneProps) {
  const cls = component.getComponentClasses('tab-pane', props);
  return <div className={cls} />;
}

TabPane.defaultProps = defaultProps;

export default TabPane;
