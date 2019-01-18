import React from 'react';

import './Menu.less';

import * as component from '../component';

export interface MenuProps extends component.ComponentBase {}

const defaultProps: Partial<MenuProps> = {};

function Menu(props: MenuProps) {
  const cls = component.getComponentClasses('menu', props);
  return <div className={cls} />;
}

Menu.defaultProps = defaultProps;

export default Menu;
