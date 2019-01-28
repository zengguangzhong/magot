import React from 'react';

import SubMenu from './SubMenu';
import MenuItem from './MenuItem';
import MenuItemGroup from './MenuItemGroup';
import MenuDivider from './MenuDivider';
import MenuItems from './MenuItems';
import ItemClickContext, { ItemClickHandler } from './ItemClickContext';
import { IconPosition } from '../Icon/Iconable';
import * as component from '../component';

import './Menu.less';

export interface MenuDividerData {
  divider: boolean;
}

export interface MenuItemData {
  /**
   * 菜单项标签
   */
  label: string;
  /**
   * 菜单项标识
   */
  name?: string;
  /**
   * 菜单项内容值
   */
  value?: any;
  icon?: string;
  iconPosition?: IconPosition;
  iconSize?: number;
  disabled?: boolean;
}

export interface MenuItemGroupData {
  /**
   * 菜单组标题
   */
  title: string;
  icon?: string;
  iconPosition?: IconPosition;
  iconSize?: number;
  disabled?: boolean;
  /**
   * 菜单项数据列表
   */
  items: MenuItemArray;
}

export interface SubMenuData extends MenuItemData {
  /**
   * 菜单项数据列表
   */
  items: MenuItemArray;
}

export type MenuItemArray = Array<
  MenuItemData | MenuDividerData | MenuItemGroupData | SubMenuData
>;

export interface MenuProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 是否显示边框
   * @default true
   */
  border?: boolean;

  /**
   * 菜单项数据列表
   * @default null
   */
  items?: MenuItemArray | null;

  /**
   * 菜单项点击事件的回调函数
   */
  onItemClick?: ItemClickHandler;
}

const defaultProps: Partial<MenuProps> = {
  items: null,
  border: true,
};

function Menu(props: MenuProps) {
  const { border, items, children, style, onItemClick } = props;
  if (!children && !items) return null;

  const cls = component.getComponentClasses('menu', props, {
    'no-border': !border,
  });

  return (
    <ItemClickContext.Provider value={onItemClick}>
      <ul className={cls} style={style}>
        {items ? <MenuItems items={items} /> : children}
      </ul>
    </ItemClickContext.Provider>
  );
}

Menu.defaultProps = defaultProps;

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = MenuItemGroup;
Menu.Divider = MenuDivider;

export default Menu;
