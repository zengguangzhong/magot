import React from 'react';

import * as component from '../component';

export interface MenuItemProps extends component.ComponentBase {}

const defaultProps: Partial<MenuItemProps> = {};

function MenuItem(props: MenuItemProps) {
  const cls = component.getComponentClasses('menu-item', props);
  return <div className={cls} />;
}

MenuItem.defaultProps = defaultProps;

export default MenuItem;
