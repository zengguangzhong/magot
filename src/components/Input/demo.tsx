import React from 'react';
import Input from './Input';
import { Link } from 'react-router-dom';

function InputDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Input />
      </div>
    </>
  );
}

export default InputDemo;
