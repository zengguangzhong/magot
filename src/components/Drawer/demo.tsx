import React from 'react';
import Drawer from './Drawer';
import { Link } from 'react-router-dom';

function DrawerDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Drawer />
      </div>
    </>
  );
}

export default DrawerDemo;
