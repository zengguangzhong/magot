import React from 'react';

import * as component from '../component';

export interface TabPaneProps
  extends component.NestedComponent,
    component.IconableComponent,
    component.DisableComponent {
  /**
   * 指定该Tab的名称，name必须唯一
   */
  name: string;

  /**
   * 指定该Tab的标签名
   */
  label: string | React.ReactNode;
}

const defaultProps: Partial<TabPaneProps> = {
  ...component.getDefaultDisabledProps(),
};

function TabPane(props: TabPaneProps) {
  console.log(props);
  return null;
}

TabPane.defaultProps = defaultProps;

export default TabPane;
