import React from 'react';

import * as component from '../component';

import './MenuDivider.less';

function MenuDivider() {
  const cls = component.getComponentClasses('menu-divider');
  return <li className={cls} />;
}

export default MenuDivider;
