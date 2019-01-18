import React from 'react';
import Popover from './Popover';
import { Link } from 'react-router-dom';

function PopoverDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Popover />
      </div>
    </>
  );
}

export default PopoverDemo;
