import React from 'react';

import SubMenu, { SubMenuProps } from './SubMenu';
import MenuItem, { MenuItemProps } from './MenuItem';
import MenuItemGroup, { MenuItemGroupProps } from './MenuItemGroup';
import MenuDivider, { MenuDividerProps } from './MenuDivider';
import MenuItems from './MenuItems';
import MenuContext from './MenuContext';
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
  label?: React.ReactText;
  /**
   * 菜单项内容值
   */
  value?: React.ReactText;
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

export type MenuChildren =
  | React.FunctionComponentElement<MenuItemProps>
  | React.FunctionComponentElement<MenuDividerProps>
  | React.FunctionComponentElement<MenuItemGroupProps>
  | React.FunctionComponentElement<SubMenuProps>
  | Array<
      | React.FunctionComponentElement<MenuItemProps>
      | React.FunctionComponentElement<MenuDividerProps>
      | React.FunctionComponentElement<MenuItemGroupProps>
      | React.FunctionComponentElement<SubMenuProps>
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
   * 指定菜单的宽度，若不指定，则随着内容自由伸缩
   */
  width?: number;

  /**
   * 是否允许多选，当时多选时，则可以反选已经选中的菜单项
   * @default false
   */
  multiple?: boolean;

  /**
   * 是否允许选中（高亮选中的菜单项）
   * @default false
   */
  selectable?: boolean;

  /**
   * 选中的内容列表（value）
   * @default []
   */
  selectedValues?: React.ReactText[];

  /**
   * 菜单项数据列表
   * @default null
   */
  items?: MenuItemArray | null;

  /**
   * 菜单项组件
   */
  children?: MenuChildren;

  /**
   * 菜单项点击事件的回调函数
   */
  onItemClick?: (
    item: MenuItemProps,
    e: React.MouseEvent<HTMLLIElement>
  ) => void;

  /**
   * 选中菜单项时的回调函数
   */
  onSelect?: (item: MenuItemProps, selectedValues?: React.ReactText[]) => void;

  /**
   * 反选菜单项时的回调函数，仅在多选时有效
   */
  onDeselect?: (
    item: MenuItemProps,
    selectedValues?: React.ReactText[]
  ) => void;
}

const defaultProps: Partial<MenuProps> = {
  items: null,
  border: true,
  multiple: false,
  selectable: false,
  selectedValues: [],
};

function Menu(props: MenuProps) {
  if (!props.children && !props.items) return null;

  let values = props.selectedValues || [];
  if (!props.multiple) values = [values[0]];

  const [selectedValues, setSelectedValues] = React.useState(values);

  const updateSelectedValues = (item: MenuItemProps) => {
    if (props.selectable && item.value) {
      let newSelectedValues = [item.value];
      let deselected = false;

      if (props.multiple) {
        const index = selectedValues.indexOf(item.value);
        if (index >= 0) {
          selectedValues.splice(index, 1);
          deselected = true;
        } else {
          selectedValues.push(item.value);
        }
        newSelectedValues = [...selectedValues];
      }

      setSelectedValues(newSelectedValues);

      if (deselected) {
        props.onDeselect && props.onDeselect(item, newSelectedValues);
      } else {
        props.onSelect && props.onSelect(item, newSelectedValues);
      }
    }
  };

  const handleItemClick = (
    item: MenuItemProps,
    e: React.MouseEvent<HTMLLIElement>
  ) => {
    updateSelectedValues(item);
    props.onItemClick && props.onItemClick(item, e);
  };

  const ctx = {
    multiple: props.multiple,
    selectable: props.selectable,
    selectedValues,
    onItemClick: handleItemClick,
  };

  const cls = component.getComponentClasses('menu', props, {
    'no-border': !props.border,
  });

  return (
    <MenuContext.Provider value={ctx}>
      <ul className={cls} style={{ ...props.style, width: props.width }}>
        {props.items ? <MenuItems items={props.items} /> : props.children}
      </ul>
    </MenuContext.Provider>
  );
}

Menu.defaultProps = defaultProps;

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = MenuItemGroup;
Menu.Divider = MenuDivider;

export default Menu;
