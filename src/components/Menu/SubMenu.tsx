import React from 'react';

import Menu, { MenuItemArray, MenuChildren } from './Menu';
import MenuItems from './MenuItems';
import MenuContext from './MenuContext';
import Popup from '../Popup';
import Icon from '../Icon';
import Iconable from '../Icon/Iconable';
import * as component from '../component';

import './SubMenu.less';

export interface SubMenuProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.NestedComponent,
    component.IconableComponent {
  /**
   * 子菜单标签
   */
  label?: React.ReactText;

  /**
   * 子菜单内容值
   */
  value?: React.ReactText;

  /**
   * 子菜单项数据列表
   * @default null
   */
  items?: MenuItemArray | null;

  /**
   * 子菜单项组件
   */
  children?: MenuChildren;
}

const defaultProps: Partial<SubMenuProps> = {
  ...component.getDefaultDisabledProps(),
  items: null,
};

function SubMenu(props: SubMenuProps) {
  const { disabled, ...otherProps } = props;
  const type = 'submenu';
  const prefix = component.getComponentPrefix(type);
  const inherits = component.getComponentClasses('menu-item', { disabled });
  const cls = component.getComponentClasses(type, otherProps, inherits);

  const overlay = (
    <MenuContext.Consumer>
      {ctx => {
        return (
          <Menu {...ctx} className={prefix + '-popup'}>
            {props.items ? <MenuItems items={props.items} /> : props.children}
          </Menu>
        );
      }}
    </MenuContext.Consumer>
  );

  return (
    <Popup
      className={prefix + '-popup'}
      placement="rightTop"
      space={4}
      preventOut={true}
      removeWhenClose={false}
      overlay={overlay}>
      <li className={cls} style={props.style}>
        <Iconable
          name={props.icon}
          position={props.iconPosition}
          size={props.iconSize}>
          <span className="label">
            {props.label !== void 0 ? props.label : props.value}
          </span>
        </Iconable>
        <Icon name="forward" />
      </li>
    </Popup>
  );
}

SubMenu.defaultProps = defaultProps;

export default SubMenu;
