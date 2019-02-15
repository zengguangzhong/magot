import React from 'react';
import { Link } from 'react-router-dom';
import Menu, { MenuItemArray } from './Menu';

function range(count: number) {
  return Array.from({ length: count }, (v, i) => {
    v;
    return i + 1;
  });
}

const itemIcons = ['home', 'image', 'chat', 'setting', 'qrcode'];
const groupIcons = ['folder', 'store'];

const items1: MenuItemArray = getMenuItemsData();
const items2: MenuItemArray = getMenuItemsData(true);

const items3: MenuItemArray = [
  { title: 'Group 1', icon: 'folder', items: getMenuItemsData(true, 1) },
  {
    title: 'Group 2',
    icon: 'store',
    disabled: true,
    items: getMenuItemsData(true, 2),
  },
];

const items4: MenuItemArray = [
  {
    label: 'Sub Menu 1',
    value: 'sub_menu_1',
    icon: itemIcons[0],
    items: getMenuItemsData(false, 1),
  },
  {
    label: 'Sub Menu 2',
    value: 'sub_menu_2',
    icon: itemIcons[1],
    items: getMenuItemsData(false, 2),
  },
  {
    label: 'Sub Menu 3',
    value: 'sub_menu_3',
    icon: itemIcons[2],
    items: getMenuItemsData(false, 3),
  },
  {
    label: 'Sub Menu 4',
    value: 'sub_menu_4',
    icon: itemIcons[3],
    disabled: true,
    items: getMenuItemsData(false, 4),
  },
];

function getMenuItemsData(withIcon?: boolean, prefix?: number) {
  return range(5).map((v, i) => {
    if (v === 4) return { divider: true };
    const key = prefix !== void 0 ? prefix + '.' + v : v;
    return {
      label: 'Menu Item ' + key,
      value: 'menu_item_' + key,
      icon: withIcon ? itemIcons[i] : undefined,
      disabled: v === 5,
    };
  });
}

function getMenuItems(withIcon?: boolean, prefix?: number) {
  return range(5).map((v, i) => {
    const key = prefix !== void 0 ? prefix + '.' + v : v;
    if (v === 4) return <Menu.Divider key={key} />;
    return (
      <Menu.Item
        key={key}
        icon={withIcon ? itemIcons[i] : undefined}
        value={'menu_item_' + key}
        disabled={v === 5}>
        Menu Item {key}
      </Menu.Item>
    );
  });
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
        <Menu
          selectable={true}
          selectedValues={['menu_item_2']}
          onItemClick={console.log}>
          {getMenuItems()}
        </Menu>
        {/* basic usage, have icons */}
        <Menu
          multiple={true}
          selectable={true}
          selectedValues={['menu_item_1', 'menu_item_3']}
          // tslint:disable-next-line
          onSelect={item => console.log('selected: ', item)}
          // tslint:disable-next-line
          onDeselect={item => console.log('deselected: ', item)}
          onItemClick={console.log}>
          {getMenuItems(true)}
        </Menu>
        {/* ItemGroup */}
        <Menu
          multiple={true}
          selectable={true} // tslint:disable-next-line
          onSelect={item => console.log('selected: ', item)}
          // tslint:disable-next-line
          onDeselect={item => console.log('deselected: ', item)}
          onItemClick={console.log}>
          {range(2).map((g, i) => {
            return (
              <Menu.ItemGroup
                key={g}
                title={'Group ' + g}
                icon={groupIcons[i]}
                disabled={g === 2}>
                {getMenuItems(true, g)}
              </Menu.ItemGroup>
            );
          })}
        </Menu>
        {/* nested SubMenu */}
        <Menu
          multiple={true}
          selectable={true} // tslint:disable-next-line
          onSelect={(item, values) => console.log('selected: ', item, values)}
          // tslint:disable-next-line
          onDeselect={(item, values) =>
            console.log('deselected: ', item, values)
          }
          onItemClick={console.log}>
          {range(4).map((s, i) => {
            return (
              <Menu.SubMenu
                key={s}
                value={`sub_menu_${s}`}
                label={`Sub Menu ${s}`}
                icon={itemIcons[i]}
                disabled={s === 4}>
                {getMenuItems(false, s)}
              </Menu.SubMenu>
            );
          })}
        </Menu>
        <Menu width={240} onItemClick={console.log}>
          <Menu.ItemGroup title="Custom Item Renderer">
            {range(6).map(v => {
              return (
                <Menu.Item key={v} value={`menu_item_${v}`}>
                  <span style={{ float: 'left' }}>Menu Item {v}</span>
                  <span
                    style={{ float: 'right', color: '#d9d9d9', fontSize: 12 }}>
                    No.{v}
                  </span>
                </Menu.Item>
              );
            })}
          </Menu.ItemGroup>
        </Menu>
      </div>
      {/* render by data */}
      <div className="demo-box demo-float">
        <Menu items={items1} onItemClick={console.log} />
        <Menu items={items2} onItemClick={console.log} />
        <Menu items={items3} onItemClick={console.log} />
        <Menu items={items4} onItemClick={console.log} />
      </div>
    </>
  );
}

export default MenuDemo;
