import React from 'react';
import { SubMenuProps } from './SubMenu';
import { MenuItemProps } from './MenuItem';

export type ItemClickHandler =
  | ((
      item: MenuItemProps | SubMenuProps,
      e: React.MouseEvent<HTMLLIElement>
    ) => void)
  | undefined;

const context = React.createContext<ItemClickHandler>(undefined);

export default context;
