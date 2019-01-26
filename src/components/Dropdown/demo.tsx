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
    { label: 'dropdown item 1', name: 'dropdown_item_1' },
    { label: 'dropdown item 2', name: 'dropdown_item_2' },
    {
      label: 'dropdown item 3',
      name: 'dropdown_item_3',
      items: [
        { label: 'dropdown item 3.1', name: 'dropdown_item_3.1' },
        { label: 'dropdown item 3.2', name: 'dropdown_item_3.2' },
      ],
    },
    { label: 'dropdown item 4', name: 'dropdown_item_4', disabled: true },
  ];
  const handleItemClick = (name?: string) => {
    Toast.info('You click on ' + name);
  };
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Dropdown overlay={menus1}>
          <a href="javascript:;" style={{ marginRight: 40 }}>
            hover me
          </a>
        </Dropdown>
        <Dropdown overlay={menus1} disabled={true}>
          <a href="javascript:;" style={{ marginRight: 40 }}>
            hover me
          </a>
        </Dropdown>
        <Dropdown overlay={menus1} trigger="click">
          <a href="javascript:;" style={{ marginRight: 40 }}>
            click me
          </a>
        </Dropdown>
        <Dropdown
          overlay={<Menu items={menus2} onItemClick={handleItemClick} />}>
          <a href="javascript:;" style={{ marginRight: 40 }}>
            cascading dropdown
          </a>
        </Dropdown>
        <Dropdown.Button
          overlay={menus1}
          trigger="click"
          type="primary"
          icon="caret"
          iconPosition="right">
          Dropdown
        </Dropdown.Button>
        <Dropdown.Button
          overlay={menus1}
          trigger="click"
          type="primary"
          icon="caret"
          iconPosition="right"
          disabled={true}>
          Dropdown
        </Dropdown.Button>
      </div>
      <div className="demo-box">
        <Dropdown overlay={menus1} align="topLeft">
          <Button>topLeft</Button>
        </Dropdown>
        <Dropdown overlay={menus1} align="top">
          <Button>top</Button>
        </Dropdown>
        <Dropdown overlay={menus1} align="topRight">
          <Button>topRight</Button>
        </Dropdown>
        <Dropdown overlay={menus1} align="bottomLeft">
          <Button>bottomLeft</Button>
        </Dropdown>
        <Dropdown overlay={menus1} align="bottom">
          <Button>bottom</Button>
        </Dropdown>
        <Dropdown overlay={menus1} align="bottomRight">
          <Button>bottomRight</Button>
        </Dropdown>
      </div>
    </>
  );
}

export default DropdownDemo;
