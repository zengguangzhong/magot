import React from 'react';
import Menu from './Menu';
import { Link } from 'react-router-dom';

function MenuDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Menu />
      </div>
    </>
  );
}

export default MenuDemo;
