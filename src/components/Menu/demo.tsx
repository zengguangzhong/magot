import React from 'react';
import { Link } from 'react-router-dom';
import Menu, { MenuItemArray } from './Menu';
import Toast from '../Toast';

const items1: MenuItemArray = [
  { label: 'Menu Item 1', value: 'menu_item_1' },
  { label: 'Menu Item 2', value: 'menu_item_2' },
  { label: 'Menu Item 3', value: 'menu_item_3', disabled: true },
  { label: 'Menu Item 4', value: 'menu_item_4' },
];

const items2: MenuItemArray = [
  { label: 'Menu Item 1', value: 'menu_item_1', icon: 'home' },
  { label: 'Menu Item 2', value: 'menu_item_2', icon: 'store' },
  { label: 'Menu Item 3', value: 'menu_item_3', icon: 'chat', disabled: true },
  { divider: true },
  { label: 'Menu Item 4', value: 'menu_item_4', icon: 'setting' },
];

const items3: MenuItemArray = [
  { title: 'Group 1', icon: 'folder', items: items1 },
  { title: 'Group 2', icon: 'store', disabled: true, items: items2 },
];

const items4: MenuItemArray = [
  { label: 'Sub Menu 1', value: 'sub_menu_1', icon: 'home', items: items1 },
  { label: 'Sub Menu 2', value: 'sub_menu_2', icon: 'store', items: items3 },
  {
    label: 'Sub Menu 3',
    value: 'sub_menu_3',
    icon: 'chat',
    items: [
      { label: 'Menu Item 1', value: 'menu_item_1' },
      { label: 'Menu Item 2', value: 'menu_item_2' },
      {
        label: 'Menu Item 3',
        value: 'menu_item_3',
        items: [
          { label: 'Menu Item 3.1', value: 'menu_item_3.1' },
          { label: 'Menu Item 3.2', value: 'menu_item_3.2' },
        ],
      },
    ],
  },
  {
    label: 'Sub Menu 4',
    value: 'sub_menu_4',
    icon: 'setting',
    disabled: true,
    items: [],
  },
  { label: 'Menu Item 5', value: 'menu_item_5', icon: 'money' },
];

function handleItemClick(value?: string | number) {
  Toast.info(value);
}

function MenuDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      {/* render by component */}
      <div className="demo-box demo-float">
        {/* basic usage */}
        <Menu onItemClick={handleItemClick}>
          <Menu.Item value="menu_item_1">Menu Item 1</Menu.Item>
          <Menu.Item value="menu_item_2">Menu Item 2</Menu.Item>
          <Menu.Item value="menu_item_3" disabled={true}>
            Menu Item 3
          </Menu.Item>
          <Menu.Item value="menu_item_4">Menu Item 4</Menu.Item>
        </Menu>
        {/* basic usage, have icons */}
        <Menu>
          <Menu.Item icon="home">Menu Item 1</Menu.Item>
          <Menu.Item icon="store">Menu Item 2</Menu.Item>
          <Menu.Item icon="chat" disabled={true}>
            Menu Item 3
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item icon="setting">Menu Item 4</Menu.Item>
        </Menu>
        {/* ItemGroup */}
        <Menu>
          <Menu.ItemGroup title="Group 1" icon="folder">
            <Menu.SubMenu label="Menu Item 1">
              <Menu.Item>Menu Item 1.1</Menu.Item>
              <Menu.Item>Menu Item 1.2</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item>Menu Item 2</Menu.Item>
            <Menu.Item disabled={true}>Menu Item 3</Menu.Item>
            <Menu.Item>Menu Item 4</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Group 2" icon="store" disabled={true}>
            <Menu.Item icon="home">Menu Item 1</Menu.Item>
            <Menu.Item icon="store">Menu Item 2</Menu.Item>
            <Menu.Item icon="chat">Menu Item 3</Menu.Item>
            <Menu.Divider />
            <Menu.Item icon="setting">Menu Item 4</Menu.Item>
          </Menu.ItemGroup>
        </Menu>
        {/* nested SubMenu and ItemGroup */}
        <Menu>
          <Menu.SubMenu icon="home" label="Sub Menu 1">
            <Menu.Item>Menu Item 1</Menu.Item>
            <Menu.Item>Menu Item 2</Menu.Item>
            <Menu.Item disabled={true}>Menu Item 3</Menu.Item>
            <Menu.Item>Menu Item 4</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu icon="store" label="Sub Menu 2">
            <Menu.ItemGroup title="Group 1" icon="folder">
              <Menu.SubMenu label="Menu Item 1">
                <Menu.Item>Menu Item 1.1</Menu.Item>
                <Menu.Item>Menu Item 1.2</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item>Menu Item 2</Menu.Item>
              <Menu.Item disabled={true}>Menu Item 3</Menu.Item>
              <Menu.Item>Menu Item 4</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Group 2" icon="store" disabled={true}>
              <Menu.Item icon="home">Menu Item 1</Menu.Item>
              <Menu.Item icon="store">Menu Item 2</Menu.Item>
              <Menu.Item icon="chat">Menu Item 3</Menu.Item>
              <Menu.Divider />
              <Menu.Item icon="setting">Menu Item 4</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
          <Menu.SubMenu icon="chat" label="Sub Menu 3">
            <Menu.Item>Menu Item 1</Menu.Item>
            <Menu.Item>Menu Item 2</Menu.Item>
            <Menu.SubMenu label="Menu Item 3">
              <Menu.Item>Menu Item 3.1</Menu.Item>
              <Menu.Item>Menu Item 3.2</Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
          <Menu.SubMenu icon="setting" label="Sub Menu 4" disabled={true} />
          <Menu.Item icon="money">Menu Item 5</Menu.Item>
        </Menu>
      </div>
      {/* render by data */}
      <div className="demo-box demo-float">
        <Menu items={items1} onItemClick={handleItemClick} />
        <Menu items={items2} onItemClick={handleItemClick} />
        <Menu items={items3} onItemClick={handleItemClick} />
        <Menu items={items4} onItemClick={handleItemClick} />
      </div>
    </>
  );
}

export default MenuDemo;
