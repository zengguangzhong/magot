import React from 'react';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';

function DropdownDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Dropdown />
      </div>
    </>
  );
}

export default DropdownDemo;
