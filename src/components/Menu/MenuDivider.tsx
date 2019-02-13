import React from 'react';

import * as component from '../component';

import './MenuDivider.less';

export interface MenuDividerProps {}

function MenuDivider(props: MenuDividerProps) {
  const cls = component.getComponentClasses('menu-divider', props);
  return <li className={cls} />;
}

export default MenuDivider;
