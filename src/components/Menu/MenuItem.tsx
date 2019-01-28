import React from 'react';

import ItemClickContext from './ItemClickContext';
import Iconable from '../Icon/Iconable';
import * as component from '../component';

import './MenuItem.less';

export interface MenuItemProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.NestedComponent,
    component.IconableComponent {
  /**
   * 菜单项标识
   */
  name?: string;

  /**
   * 菜单项内容值
   */
  value?: any;
}

const defaultProps: Partial<MenuItemProps> = {
  ...component.getDefaultDisabledProps(),
};

function MenuItem(props: MenuItemProps) {
  const cls = component.getComponentClasses('menu-item', props);
  return (
    <ItemClickContext.Consumer>
      {onClick => {
        const handleClick = () => {
          if (onClick) onClick(props.name, props.value);
        };
        return (
          <li className={cls} style={props.style} onClick={handleClick}>
            <Iconable
              name={props.icon}
              position={props.iconPosition}
              size={props.iconSize}>
              {props.children}
            </Iconable>
          </li>
        );
      }}
    </ItemClickContext.Consumer>
  );
}

MenuItem.defaultProps = defaultProps;

export default MenuItem;
