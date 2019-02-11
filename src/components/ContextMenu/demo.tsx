import React from 'react';
import { Link } from 'react-router-dom';
import ContextMenu from './ContextMenu';
import Menu from '../Menu';
import Button from '../Button';

function ContextMenuDemo() {
  const menu = (
    <Menu>
      <Menu.Item value="copy">Copy</Menu.Item>
      <Menu.Item value="paste">Paste</Menu.Item>
      <Menu.Divider />
      <Menu.Item value="save" icon="publish">
        Save
      </Menu.Item>
      <Menu.Item value="download" icon="download">
        Download
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <ContextMenu menu={menu}>
          <Button type="primary">ContextMenu</Button>
        </ContextMenu>
        <ContextMenu menu={menu} disabled={true}>
          <Button type="primary">ContextMenu(Disabled)</Button>
        </ContextMenu>
      </div>
    </>
  );
}

export default ContextMenuDemo;
