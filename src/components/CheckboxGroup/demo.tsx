import React from 'react';
import CheckboxGroup from './CheckboxGroup';
import { Link } from 'react-router-dom';

function CheckboxGroupDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <CheckboxGroup />
      </div>
    </>
  );
}

export default CheckboxGroupDemo;
