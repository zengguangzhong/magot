import React from 'react';
import Switch from './Switch';
import { Link } from 'react-router-dom';

function SwitchDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Switch />
      </div>
    </>
  );
}

export default SwitchDemo;
