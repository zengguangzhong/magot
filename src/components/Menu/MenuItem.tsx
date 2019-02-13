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
   * 选项标签
   */
  label?: React.ReactText;

  /**
   * 菜单项内容值
   */
  value?: React.ReactText;
}

const defaultProps: Partial<MenuItemProps> = {
  ...component.getDefaultDisabledProps(),
};

function MenuItem(props: MenuItemProps) {
  const cls = component.getComponentClasses('menu-item', props);
  const children =
    props.children !== void 0
      ? props.children
      : props.label !== void 0
      ? props.label
      : props.value;
  return (
    <ItemClickContext.Consumer>
      {onClick => {
        const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (onClick) onClick(props, e);
        };
        return (
          <li className={cls} style={props.style} onClick={handleClick}>
            <Iconable
              name={props.icon}
              position={props.iconPosition}
              size={props.iconSize}>
              {children}
            </Iconable>
          </li>
        );
      }}
    </ItemClickContext.Consumer>
  );
}

MenuItem.defaultProps = defaultProps;

export default MenuItem;
