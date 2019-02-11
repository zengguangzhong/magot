import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import Menu, { MenuItemArray } from '../Menu';
import Button from '../Button';
import Toast from '../Toast';

function DropdownDemo() {
  const menus1 = (
    <Menu>
      <Menu.Item>
        <a href="https://github.com/" target="_blank">
          github.com
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href="https://reactjs.org/" target="_blank">
          reactjs.org
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://www.facebook.com/" target="_blank">
          facebook.com
        </a>
      </Menu.Item>
    </Menu>
  );
  const menus2: MenuItemArray = [
    { label: 'dropdown item 1', value: 'dropdown_item_1' },
    { label: 'dropdown item 2', value: 'dropdown_item_2' },
    {
      label: 'dropdown item 3',
      value: 'dropdown_item_3',
      items: [
        { label: 'dropdown item 3.1', value: 'dropdown_item_3.1' },
        { label: 'dropdown item 3.2', value: 'dropdown_item_3.2' },
      ],
    },
    { label: 'dropdown item 4', value: 'dropdown_item_4', disabled: true },
  ];
  const handleItemClick = (value?: string | number) => {
    Toast.info('You click on ' + value);
  };
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Dropdown menu={menus1}>
          <a href="javascript:;" style={{ marginRight: 40 }}>
            hover me
          </a>
        </Dropdown>
        <Dropdown menu={menus1} disabled={true}>
          <a href="javascript:;" style={{ marginRight: 40 }}>
            hover me
          </a>
        </Dropdown>
        <Dropdown menu={menus1} trigger="click">
          <a href="javascript:;" style={{ marginRight: 40 }}>
            click me
          </a>
        </Dropdown>
        <Dropdown menu={<Menu items={menus2} onItemClick={handleItemClick} />}>
          <a href="javascript:;" style={{ marginRight: 40 }}>
            cascading dropdown
          </a>
        </Dropdown>
        <Dropdown.Button
          menu={menus1}
          trigger="click"
          type="primary"
          icon="caret"
          iconPosition="right">
          Dropdown
        </Dropdown.Button>
        <Dropdown.Button
          menu={menus1}
          trigger="click"
          type="primary"
          icon="caret"
          iconPosition="right"
          disabled={true}>
          Dropdown
        </Dropdown.Button>
      </div>
      <div className="demo-box">
        <Dropdown menu={menus1} placement="topLeft">
          <Button>topLeft</Button>
        </Dropdown>
        <Dropdown menu={menus1} placement="top">
          <Button>top</Button>
        </Dropdown>
        <Dropdown menu={menus1} placement="topRight">
          <Button>topRight</Button>
        </Dropdown>
        <Dropdown menu={menus1} placement="bottomLeft">
          <Button>bottomLeft</Button>
        </Dropdown>
        <Dropdown menu={menus1} placement="bottom">
          <Button>bottom</Button>
        </Dropdown>
        <Dropdown menu={menus1} placement="bottomRight">
          <Button>bottomRight</Button>
        </Dropdown>
      </div>
    </>
  );
}

export default DropdownDemo;
