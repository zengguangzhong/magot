import React from 'react';
import { MenuItemArray } from './Menu';
import SubMenu from './SubMenu';
import MenuItem from './MenuItem';
import MenuDivider from './MenuDivider';
import MenuItemGroup from './MenuItemGroup';

interface MenuItemsProps {
  items: MenuItemArray;
}

export default function MenuItems(props: MenuItemsProps) {
  return (
    <>
      {props.items.map((item, index) => {
        if ('divider' in item) {
          // MenuDivider
          return item.divider ? <MenuDivider key={index} /> : null;
        }

        if ('items' in item) {
          // MenuItemGroup or SubMenu
          let items = item.items;
          // if it's disabled, all nested items will be disabled
          if (item.disabled) items = disableItems(items);
          if ('title' in item) {
            // MenuItemGroup
            return <MenuItemGroup key={index} {...item} items={items} />;
          }
          // SubMenu
          return (
            <SubMenu key={'' + (item.value || index)} {...item} items={items} />
          );
        }

        // MenuItem
        const { label, ...props } = item;
        return (
          <MenuItem key={'' + (props.value || index)} {...props}>
            {label}
          </MenuItem>
        );
      })}
    </>
  );
}

function disableItems(items: MenuItemArray) {
  return items.map(item => {
    if ('divider' in item) return item;
    return { ...item, disabled: true };
  });
}
