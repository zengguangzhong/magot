import React from 'react';

import './MenuDivider.less';

import * as component from '../component';

function MenuDivider() {
  const cls = component.getComponentClasses('menu-divider', {});
  return <li className={cls} />;
}

export default MenuDivider;
