import React from 'react';

import { MenuProps } from '../Menu';
import Dropdown from '../Dropdown';
import * as component from '../component';

import './ContextMenu.less';

export interface ContextMenuProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.NestedComponent {
  /**
   * 下拉菜单组件(Menu)
   */
  menu: React.ReactElement<MenuProps>;
}

const defaultProps: Partial<ContextMenuProps> = {
  ...component.getDefaultDisabledProps(),
};

function ContextMenu(props: ContextMenuProps) {
  const cls = component.getComponentClasses('context-menu', props);
  return (
    <Dropdown className={cls} {...props} trigger="contextMenu">
      {props.children}
    </Dropdown>
  );
}

ContextMenu.defaultProps = defaultProps;

export default ContextMenu;
