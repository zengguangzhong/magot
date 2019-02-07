import React, { Children, cloneElement } from 'react';

import { MenuItemArray } from './Menu';
import MenuItems from './MenuItems';
import Iconable from '../Icon/Iconable';
import * as component from '../component';

import './MenuItemGroup.less';

export interface MenuItemGroupProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.NestedComponent,
    component.IconableComponent {
  /**
   * 菜单组标题
   */
  title: string;

  /**
   * 子菜单项数据列表
   * @default null
   */
  items?: MenuItemArray | null;
}

const defaultProps: Partial<MenuItemGroupProps> = {
  ...component.getDefaultDisabledProps(),
  items: null,
};

function MenuItemGroup(props: MenuItemGroupProps) {
  let children = props.children;
  const cls = component.getComponentClasses('menu-item-group', {
    className: props.className,
  });
  if (props.disabled && children) {
    children = Children.toArray(children).map(child => {
      if (!React.isValidElement(child)) return null;
      const element = child as React.ReactElement<any>;
      return cloneElement(element, { disabled: props.disabled });
    });
  }
  return (
    <li className={cls} style={props.style}>
      <div className="title">
        <Iconable
          name={props.icon}
          position={props.iconPosition}
          size={props.iconSize}>
          {props.title}
        </Iconable>
      </div>
      <ul className="list">
        {props.items ? <MenuItems items={props.items} /> : children}
      </ul>
    </li>
  );
}

MenuItemGroup.defaultProps = defaultProps;

export default MenuItemGroup;
