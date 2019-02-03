import React from 'react';
import { Link } from 'react-router-dom';
import Popup from './Popup';
import Button from '../Button';
import Loading from '../Loading';
import Menu from '../Menu';

function PopupDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Popup overlay={<div>This is a popup message</div>}>
          <Button type="primary">hover me to show popup</Button>
        </Popup>
        <Popup overlay={<Loading tip="loading..." />}>
          <Button type="primary">hover me to show loading</Button>
        </Popup>
        <Popup
          placement="bottomLeft"
          trigger="click"
          space={4}
          overlay={
            <Menu>
              <Menu.Item>menu item 1</Menu.Item>
              <Menu.Item>menu item 2</Menu.Item>
              <Menu.Item>menu item 3</Menu.Item>
            </Menu>
          }>
          <Button>I'm a Menu, click me</Button>
        </Popup>
        <Popup
          placement="bottomLeft"
          trigger="contextMenu"
          overlay={
            <Menu>
              <Menu.Item>menu item 1</Menu.Item>
              <Menu.Item>menu item 2</Menu.Item>
              <Menu.Item>menu item 3</Menu.Item>
            </Menu>
          }>
          <Button>I'm a ContextMenu, click me</Button>
        </Popup>
      </div>
    </>
  );
}

export default PopupDemo;
